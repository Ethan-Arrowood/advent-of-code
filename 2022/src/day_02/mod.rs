#[derive(Clone, Copy, PartialEq)]
pub enum RPS {
    Rock,
    Paper,
    Scissors,
}

pub fn rps_shape_value(input: RPS) -> i32 {
    match input {
        RPS::Rock => 1,
        RPS::Paper => 2,
        RPS::Scissors => 3,
    }
}

pub mod p1 {
    use super::{rps_shape_value, RPS};
    use crate::util;

    pub fn get_rps_shape(input: &str) -> RPS {
        match input {
            "A" | "X" => RPS::Rock,
            "B" | "Y" => RPS::Paper,
            "C" | "Z" => RPS::Scissors,
            _ => panic!("Invalid input {}", input),
        }
    }

    pub fn rps_outcome(me: RPS, op: RPS) -> i32 {
        if me == op {
            3
        } else if (me == RPS::Rock && op == RPS::Scissors)
            || (me == RPS::Paper && op == RPS::Rock)
            || (me == RPS::Scissors && op == RPS::Paper)
        {
            6
        } else {
            0
        }
    }

    pub fn main() {
        println!("Day 2 - Part 1");
        let lines = util::read_lines("./src/day_02/input");

        let mut score = 0;

        for line in lines {
            let input = line.unwrap();
            let strategy: Vec<&str> = input.split(" ").collect();
            if strategy.len() != 2 {
                panic!("Invalid input {:?}", strategy);
            }
            let op = get_rps_shape(strategy[0]);
            let me = get_rps_shape(strategy[1]);
            score += rps_shape_value(me);
            score += rps_outcome(me, op);
        }

        println!("Score: {}", score);
    }
}

pub mod p2 {
    use super::{rps_shape_value, RPS};
    use crate::util;

    #[derive(Clone, Copy, PartialEq)]
    pub enum Outcome {
        Win,
        Lose,
        Draw,
    }

    pub fn get_outcome(input: &str) -> Outcome {
        match input {
            "X" => Outcome::Lose,
            "Y" => Outcome::Draw,
            "Z" => Outcome::Win,
            _ => panic!("Invalid outcome input {}", input),
        }
    }

    pub fn get_outcome_value(input: Outcome) -> i32 {
        match input {
            Outcome::Lose => 0,
            Outcome::Draw => 3,
            Outcome::Win => 6,
        }
    }

    pub fn get_rps_shape(input: &str) -> RPS {
        match input {
            "A" => RPS::Rock,
            "B" => RPS::Paper,
            "C" => RPS::Scissors,
            _ => panic!("Invalid rps input {}", input),
        }
    }

    pub fn get_my_rps_from_outcome(op: RPS, outcome: Outcome) -> RPS {
        match outcome {
            Outcome::Draw => op,
            Outcome::Win => match op {
                RPS::Rock => RPS::Paper,
                RPS::Paper => RPS::Scissors,
                RPS::Scissors => RPS::Rock,
            },
            Outcome::Lose => match op {
                RPS::Rock => RPS::Scissors,
                RPS::Paper => RPS::Rock,
                RPS::Scissors => RPS::Paper,
            },
        }
    }

    pub fn main() {
        println!("Day 2 - Part 2");
        let lines = util::read_lines("./src/day_02/input");

        let mut score = 0;

        for line in lines {
            let input = line.unwrap();
            let strategy: Vec<&str> = input.split(" ").collect();
            if strategy.len() != 2 {
                panic!("Invalid input {:?}", strategy);
            }
            let op = get_rps_shape(strategy[0]);
            let outcome = get_outcome(strategy[1]);
            score += get_outcome_value(outcome);
            score += rps_shape_value(get_my_rps_from_outcome(op, outcome));
        }

        println!("Score: {}", score);
    }
}

pub fn main() {
    p1::main();
    p2::main();
}
