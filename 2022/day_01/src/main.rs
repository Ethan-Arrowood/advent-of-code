fn main() {
    println!("Day 1");
    let lines = include_str!("input").lines();
    let mut elves_totals: Vec<i32> = Vec::new();
    let mut temp_total: i32 = 0;
    for line in lines {
        match line {
            "" => {
                elves_totals.push(temp_total);
                temp_total = 0;
            }
            _ => {
                temp_total += line.parse::<i32>().unwrap();
            }
        }
    }
    elves_totals.sort();
    println!("Most Calories: {}", elves_totals.last().unwrap());
    println!(
        "Sum of top three most Calories: {}",
        elves_totals.iter().rev().take(3).sum::<i32>()
    );
}
