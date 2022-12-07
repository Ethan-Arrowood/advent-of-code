use crate::util::read_lines;

#[derive(Debug, PartialEq)]
pub enum Overlap {
    Complete,
    Partial,
    None
}

pub fn overlap (x1: i32, y1: i32, x2: i32, y2: i32) -> Overlap {
    if (x1 <= x2 && y1 >= y2) || (x2 <= x1 && y2 >= y1) {
        Overlap::Complete
    } else if (x1 <= x2 && x2 <= y1) || (x1 <= y2 && y2 <= y1) {
        Overlap::Partial
    } else {
        Overlap::None
    }
}

pub fn main () {
    let lines = read_lines("./src/day_04/input");
    let mut complete_overlaps = 0;
    let mut partial_overlaps = 0;
    for line in lines {
        let input = line.unwrap();
        let pairs: Vec<&str> = input.split(",").collect();
        let pair_one: Vec<&str> = pairs.get(0).unwrap().split("-").collect();
        let pair_two: Vec<&str> = pairs.get(1).unwrap().split("-").collect();
        let x1 = pair_one.get(0).unwrap().parse::<i32>().unwrap();
        let y1 = pair_one.get(1).unwrap().parse::<i32>().unwrap();
        let x2 = pair_two.get(0).unwrap().parse::<i32>().unwrap();
        let y2 = pair_two.get(1).unwrap().parse::<i32>().unwrap();
        
        match overlap(x1, y1, x2, y2) {
            Overlap::Complete => {
                complete_overlaps += 1;
                partial_overlaps += 1;
            },
            Overlap::Partial => partial_overlaps += 1,
            Overlap::None => ()
        }
    }
    println!("Complete overlaps: {}", complete_overlaps);
    println!("Partial overlaps: {}", partial_overlaps);
}