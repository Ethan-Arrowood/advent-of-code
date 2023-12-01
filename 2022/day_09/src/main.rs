use std::collections::HashSet;

type Point = (i32, i32);

#[derive(Debug)]
enum Position {
    S,
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
}

fn get_position((x1, y1): Point, (x2, y2): Point) -> Position {
    if x2 == x1 + 1 && y2 == y1 {
        Position::A
    } else if x2 == x1 && y2 == y1 - 1 {
        Position::B
    } else if x2 == x1 - 1 && y2 == y1 {
        Position::C
    } else if x2 == x1 && y2 == y1 + 1 {
        Position::D
    } else if x2 == x1 + 1 && y2 == y1 - 1 {
        Position::E
    } else if x2 == x1 - 1 && y2 == y1 - 1 {
        Position::F
    } else if x2 == x1 - 1 && y2 == y1 + 1 {
        Position::G
    } else if x2 == x1 + 1 && y2 == y1 + 1 {
        Position::H
    } else if x2 == x1 && y2 == y1 {
        Position::S
    } else {
        panic!("Could not match position {:?} {:?}", (x1, y1), (x2, y2))
    }
}

#[derive(Debug, Clone, Copy)]
enum Movement {
    Up,
    Down,
    Left,
    Right,
}

fn get_movement(s: &str) -> Movement {
    match s {
        "U" => Movement::Up,
        "D" => Movement::Down,
        "L" => Movement::Left,
        "R" => Movement::Right,
        _ => unreachable!(),
    }
}

fn move_knot(movement: Movement, head_pos: Point, tail_pos: &mut Point) -> (i32, i32) {
    let (ref mut x2, ref mut y2) = *tail_pos;
    let position = get_position(head_pos, (*x2, *y2));
    let orig = (*x2, *y2).clone();
    match position {
        Position::S => (),
        Position::A => match movement {
            Movement::Left => *x2 -= 1,
            Movement::Up | Movement::Down | Movement::Right => (),
        },
        Position::B => match movement {
            Movement::Up => *y2 += 1,
            Movement::Down | Movement::Left | Movement::Right => (),
        },
        Position::C => match movement {
            Movement::Right => *x2 += 1,
            Movement::Left | Movement::Down | Movement::Up => (),
        },
        Position::D => match movement {
            Movement::Down => *y2 -= 1,
            Movement::Left | Movement::Up | Movement::Right => (),
        },
        Position::E => match movement {
            Movement::Up | Movement::Left => {
                *x2 -= 1;
                *y2 += 1;
            }
            Movement::Right | Movement::Down => (),
        },
        Position::F => match movement {
            Movement::Up | Movement::Right => {
                *x2 += 1;
                *y2 += 1;
            }
            Movement::Down | Movement::Left => (),
        },
        Position::G => match movement {
            Movement::Down | Movement::Right => {
                *x2 += 1;
                *y2 -= 1;
            }
            Movement::Left | Movement::Up => (),
        },
        Position::H => match movement {
            Movement::Down | Movement::Left => {
                *x2 -= 1;
                *y2 -= 1;
            }
            Movement::Right | Movement::Up => (),
        },
    }
    orig
}

fn move_head(movement: Movement, pos: &mut Point) -> (i32, i32) {
    let (ref mut x, ref mut y) = *pos;
    let orig = (*x, *y).clone();
    match movement {
        Movement::Up => *y += 1,
        Movement::Down => *y -= 1,
        Movement::Left => *x -= 1,
        Movement::Right => *x += 1,
    };
    orig
}
fn main() {
    let input = include_str!("input");
    let motions: Vec<(&str, i32)> = input
        .split("\n")
        .map(|line| line.split(" ").collect::<Vec<&str>>())
        .map(|c| (c[0], c[1].parse::<i32>().unwrap()))
        .collect::<Vec<(&str, i32)>>();

    let mut positions1 = HashSet::<(i32, i32)>::new();
    let mut positions2 = HashSet::<(i32, i32)>::new();

    let mut knot_positions: [(i32, i32); 9] = [(0, 0); 9];

    let mut head_pos = (0, 0);
    let mut tail_pos = (0, 0);

    for motion in motions {
        let movement = get_movement(motion.0);
        for i in 0..=motion.1 - 1 {
            let orig_head_pos1 = move_head(movement, &mut head_pos);
            move_knot(movement, orig_head_pos1, &mut tail_pos);
            positions1.insert(tail_pos);

            let orig_head_pos2 = move_head(movement, &mut knot_positions[0]);

            let mut prev_knot = move_knot(movement, orig_head_pos2, &mut knot_positions[1]);
            for i in 1..=knot_positions.len() - 2 {
                prev_knot = move_knot(movement, prev_knot, &mut knot_positions[i + 1]);
            }
            println!(
                "movement {:?} | motion {:?}/{:?} | pos {:?}",
                movement, i, motion.1, knot_positions
            );
            positions2.insert(knot_positions[8]);
        }
    }
    println!("{:?}", positions1.len());
    println!("{:?}", positions2.len());
}
