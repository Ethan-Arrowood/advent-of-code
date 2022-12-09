pub fn get_item_priority(item: &str) -> i32 {
    let value = *item.chars().collect::<Vec<char>>().get(0).unwrap() as i32;
    match value {
        65..=90 => value - 38,
        97..=122 => value - 96,
        _ => panic!("Invalid item {:?}", item),
    }
}

pub mod p1 {
    use super::get_item_priority;
    use std::collections::HashMap;

    #[derive(Debug)]
    pub struct Rucksack<'a> {
        shared_item: &'a str,
    }

    impl<'a> Rucksack<'a> {
        pub fn new(items_raw: &'a str) -> Rucksack<'a> {
            let items: Vec<&str> = items_raw.split("").collect();
            let mut item_map_one = HashMap::<&str, i32>::new();
            let mut item_map_two = HashMap::<&str, i32>::new();
            let half = (items.len() - 1) / 2;
            let mut shared_item: &str = "";
            for i in 1..=half {
                let item_one = items.get(i).unwrap();
                let item_two = items.get(half + i).unwrap();

                *item_map_one.entry(item_one).or_insert(0) += 1;
                *item_map_two.entry(item_two).or_insert(0) += 1;

                if let Some(_) = item_map_one.get(item_two) {
                    shared_item = item_two;
                } else if let Some(_) = item_map_two.get(item_one) {
                    shared_item = item_one;
                }
            }
            Rucksack { shared_item }
        }
    }

    pub fn main() {
        println!("Day 3 - Part 1");
        let input = include_str!("input");
        let rucksacks = input.split("\n").filter_map(|r| {
            if !r.is_empty() {
                Some(Rucksack::new(r))
            } else {
                None
            }
        });
        let mut priority_value_total = 0;
        for rucksack in rucksacks {
            priority_value_total += get_item_priority(rucksack.shared_item);
        }
        println!("Sum of priority values: {}", priority_value_total);
    }
}

pub mod p2 {
    use super::get_item_priority;
    use std::collections::{HashMap, HashSet};

    pub fn main() {
        println!("Day 3 - Part 2");
        let lines: Vec<&str> = include_str!("input").lines().collect();
        let mut groups = Vec::new();
        for i in (0..lines.len()).step_by(3) {
            groups.push(&lines[i..i + 3]);
        }
        let mut priority_value_total = 0;
        for group in groups {
            let mut item_map = HashMap::new();
            for rucksack in group {
                let mut item_set = HashSet::new();
                for item in rucksack.split("") {
                    if !item.is_empty() {
                        match item_set.get(item) {
                            Some(_) => {}
                            None => {
                                *item_map.entry(item).or_insert(0) += 1;
                                item_set.insert(item);
                            }
                        };
                    }
                }
            }
            for entry in item_map {
                let (item, count) = entry;
                if count == 3 {
                    priority_value_total += get_item_priority(item);
                }
            }
        }
        println!("Priority value total {}", priority_value_total);
    }
}

pub fn main() {
    p1::main();
    p2::main();
}
