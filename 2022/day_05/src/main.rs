use regex::{Captures, Regex};

#[derive(Debug, Clone)]
struct Stack<T> {
    items: Vec<T>,
}

impl<T> Stack<T> {
    pub fn push(&mut self, item: T) {
        self.items.push(item)
    }
    pub fn pop(&mut self) -> T {
        self.items.pop().unwrap()
    }
}

fn get_capture_as_int(captures: &Captures, index: usize) -> usize {
    captures
        .get(index)
        .unwrap()
        .as_str()
        .parse::<usize>()
        .unwrap()
}

pub fn main() {
    println!("Day 5!");
    let lines = include_str!("input").lines();
    let mut crates = Vec::new();
    let mut instructions = Vec::new();
    let mut input_bit = true;
    for line in lines {
        if line.is_empty() {
            input_bit = false;
            continue;
        }
        if input_bit {
            crates.push(line);
        } else {
            instructions.push(line);
        }
    }

    let mut stacks = Vec::new();
    let stack_count_line = crates.pop().unwrap();
    let re = Regex::new(r"(\d*)\W*$").unwrap();
    let caps = re.captures(&stack_count_line).unwrap();
    let stack_count = get_capture_as_int(&caps, 1);
    for _ in 0..stack_count {
        stacks.push(Stack {
            items: Vec::<char>::new(),
        });
    }
    for line in crates.into_iter().rev() {
        for i in 0..=line.len() / 4 {
            let crate_name = line.as_bytes()[(i * 4) + 1] as char;
            let stack = stacks.get_mut(i).unwrap();
            if !crate_name.is_whitespace() {
                stack.push(crate_name);
            }
        }
    }

    for line in instructions {
        let re = Regex::new(r"move (\d*) from (\d*) to (\d*)").unwrap();
        let captures = re.captures(&line).unwrap();
        let num_to_move = get_capture_as_int(&captures, 1);
        let from_stack_index = get_capture_as_int(&captures, 2);
        let to_stack_index = get_capture_as_int(&captures, 3);

        let mut items = Vec::new();

        let from_stack = stacks.get_mut(from_stack_index - 1).unwrap();
        for _ in 0..=num_to_move - 1 {
            items.push(from_stack.pop());
        }

        // toggle this line for answers to part 1 and part 2
        items.reverse();

        let to_stack = stacks.get_mut(to_stack_index - 1).unwrap();
        for i in 0..=num_to_move - 1 {
            to_stack.push(*items.get(i).unwrap());
        }
    }
    let mut result: String = "".to_string();
    for mut stack in stacks {
        result += &stack.pop().to_string();
    }
    println!("Result: {}", result);
}
