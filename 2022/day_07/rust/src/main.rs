use crate::parser::{parse_line, Cmd, Line};

pub mod parser;

struct File<'a> {
    name: &'a str,
    size: i32,
    file_type: &'a str,
}

struct Dir<'a> {
    name: &'a str,
    entries: Vec<Node<'a>>,
}
enum Node<'a> {
    File(File<'a>),
    Dir(Dir<'a>),
}

fn insert_into_current_node(tree: Node, current_dir_path: &str, entry: Node) {}

fn main() {
    let mut lines = include_str!("test_input").lines();
    let mut root: Node;
    let mut current_dir_path: &str;
    if let Some(line) = lines.next() {
        let (_, parsed) = parse_line(line).unwrap();
        match parsed {
            Line::Cmd(Cmd::Cd { path }) => {
                root = Node::Dir(Dir {
                    name: path,
                    entries: Vec::new(),
                });
                current_dir_path = path;
            }
            _ => panic!("First line must be a Cd command. Found {:?}", parsed),
        }
    }
    for line in lines {
        let (_, parsed) = parse_line(line).unwrap();
        match parsed {
            Line::Cmd(Cmd::Ls) => {}
            Line::Cmd(Cmd::Cd { path }) => {}
            Line::File(File) => {}
            Line::Dir(Dir) => {}
        }
    }
}
