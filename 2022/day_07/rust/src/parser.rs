use nom::{
    branch::alt,
    bytes::complete::tag,
    character::complete::{alphanumeric0, alphanumeric1, digit1, space1},
    combinator::{map, opt},
    sequence::{preceded, terminated, tuple},
    IResult,
};

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parse_dir() {
        assert_eq!(parse_dir("dir abcdef"), Ok(("", Dir { name: "abcdef" })));
    }

    #[test]
    fn test_parse_file() {
        assert_eq!(
            parse_file("14848514 b.txt"),
            Ok((
                "",
                File {
                    name: "b",
                    size: 14848514,
                    ftype: "txt"
                }
            ))
        )
    }

    #[test]
    fn test_parse_cd_cmd() {
        assert_eq!(parse_cmd("$ cd a"), Ok(("", Cmd::Cd { path: "a" })));
        assert_eq!(parse_cmd("$ cd .."), Ok(("", Cmd::Cd { path: ".." })));
    }

    #[test]
    fn test_parse_ls_cmd() {
        assert_eq!(parse_cmd("$ ls"), Ok(("", Cmd::Ls)));
    }
}

#[derive(Debug, PartialEq)]
pub struct File<'a> {
    name: &'a str,
    size: i32,
    ftype: &'a str,
}

pub fn parse_file_size(input: &str) -> IResult<&str, &str> {
    terminated(digit1, space1)(input)
}

pub fn parse_file_type(input: &str) -> IResult<&str, &str> {
    preceded(tag("."), alphanumeric0)(input)
}

pub fn parse_file(input: &str) -> IResult<&str, File> {
    let (input, (size, name, ftype)) =
        tuple((parse_file_size, alphanumeric1, opt(parse_file_type)))(input)?;

    Ok((
        input,
        File {
            name,
            size: size.parse::<i32>().unwrap(),
            ftype: ftype.unwrap_or(""),
        },
    ))
}

#[derive(Debug, PartialEq)]
pub struct Dir<'a> {
    name: &'a str,
}

pub fn parse_dir(input: &str) -> IResult<&str, Dir> {
    let (input, name) = preceded(tag("dir "), alphanumeric1)(input)?;

    Ok((input, Dir { name }))
}

#[derive(Debug, PartialEq)]
pub enum Cmd<'a> {
    Cd { path: &'a str },
    Ls,
}

pub fn parse_cmd(input: &str) -> IResult<&str, Cmd> {
    let (input, _) = tag("$ ")(input)?;
    let (input, cmd) = alphanumeric1(input)?;
    match cmd {
        "cd" => {
            let (input, path) = preceded(space1, alt((tag(".."), tag("/"), alphanumeric1)))(input)?;
            Ok((input, Cmd::Cd { path }))
        }
        "ls" => Ok((input, Cmd::Ls)),
        _ => panic!("Unrecognized command {}", cmd),
    }
}

#[derive(Debug)]
pub enum Line<'a> {
    Cmd(Cmd<'a>),
    File(File<'a>),
    Dir(Dir<'a>),
}

pub fn parse_line(input: &str) -> IResult<&str, Line> {
    alt((
        map(parse_cmd, Line::Cmd),
        map(parse_file, Line::File),
        map(parse_dir, Line::Dir),
    ))(input)
}
