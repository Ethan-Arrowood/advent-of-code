use crate::parser::parse_line;

pub mod parser;

fn main() {
    let lines = include_str!("test_input").lines();
    for line in lines {
        let (_, parsed) = parse_line(line).unwrap();

        println!("{:?}", parsed);
    }
}
