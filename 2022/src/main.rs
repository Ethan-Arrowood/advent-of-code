mod day_01;
mod day_02;
mod day_03;
mod day_04;
mod util;

#[allow(dead_code)]
fn run_all() {
    day_01::main();
    day_02::main();
    day_03::main();
}

fn main() {
    println!("Advent of code!");
    // run_all();
    day_04::main();
}
