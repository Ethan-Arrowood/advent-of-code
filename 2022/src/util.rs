use std::fs::{File, read_to_string};
use std::io::{self, BufRead};
use std::path::Path;

pub fn read_lines<P>(filename: P) -> io::Lines<io::BufReader<File>> where P: AsRef<Path>, {
    let file = File::open(filename).unwrap();
    io::BufReader::new(file).lines()
}

pub fn read_file<P>(filename: P) -> String where P: AsRef<Path>, {
    read_to_string(filename).unwrap()
}