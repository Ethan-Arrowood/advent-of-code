#[derive(Debug, PartialEq)]
pub enum Overlap {
    Complete,
    Partial,
    None,
}

pub fn overlap(x1: i32, y1: i32, x2: i32, y2: i32) -> Overlap {
    if (x1 <= x2 && y1 >= y2) || (x2 <= x1 && y2 >= y1) {
        Overlap::Complete
    } else if (x1 <= x2 && x2 <= y1) || (x1 <= y2 && y2 <= y1) {
        Overlap::Partial
    } else {
        Overlap::None
    }
}

pub fn main() {
    let lines = include_str!("input").lines();
    let mut complete_overlaps = 0;
    let mut partial_overlaps = 0;
    for line in lines {
        let result = line
            .split(",")
            .flat_map(|s| s.split("-"))
            .map(|s| s.parse())
            .collect::<Result<Vec<i32>, _>>()
            .unwrap();
        let x1 = result[0];
        let y1 = result[1];
        let x2 = result[2];
        let y2 = result[3];

        match overlap(x1, y1, x2, y2) {
            Overlap::Complete => {
                complete_overlaps += 1;
                partial_overlaps += 1;
            }
            Overlap::Partial => partial_overlaps += 1,
            Overlap::None => (),
        }
    }
    println!("Complete overlaps: {}", complete_overlaps);
    println!("Partial overlaps: {}", partial_overlaps);
}
