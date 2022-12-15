fn main() {
    let mut visible = 0;
    let input = include_str!("input");
    let mut forest = Vec::<Vec<u32>>::new();
    for row in input.split("\n") {
        let mut tree_row = Vec::new();
        for tree in row.chars() {
            tree_row.push(tree.to_digit(10).unwrap());
        }
        forest.push(tree_row);
    }
    let mut highest_scenic_score = 0;
    // println!("{:?}", forest);
    for r in 0..=forest.len() - 1 {
        let row = &forest[r];
        for c in 0..=row.len() - 1 {
            let t = &row[c];
            let mut scenic_score = 1;
            // edges
            if r == 0 || r == forest.len() - 1 || c == 0 || c == row.len() - 1 {
                visible += 1;
                continue;
            }

            let mut is_visible_north = true;
            let mut is_visible_west = true;
            let mut is_visible_east = true;
            let mut is_visible_south = true;

            // north check
            let mut north_scenic_score = 0;
            for i in (0..=r - 1).rev() {
                let north_tree = forest[i][c];

                if north_tree <= *t {
                    north_scenic_score += 1;
                }

                if north_tree >= *t {
                    is_visible_north = false;
                    break;
                }
            }
            scenic_score *= north_scenic_score;

            // west check
            let mut west_scenic_score = 0;
            for i in (0..=c - 1).rev() {
                let west_tree = row[i];

                if west_tree <= *t {
                    west_scenic_score += 1;
                }

                if west_tree >= *t {
                    is_visible_west = false;
                    break;
                }
            }
            scenic_score *= west_scenic_score;

            // east check
            let mut east_scenic_score = 0;
            for i in c + 1..=row.len() - 1 {
                let east_tree = row[i];

                if east_tree <= *t {
                    east_scenic_score += 1;
                }

                if east_tree >= *t {
                    is_visible_east = false;
                    break;
                }
            }
            scenic_score *= east_scenic_score;

            // south check
            let mut south_scenic_score = 0;
            for i in r + 1..=forest.len() - 1 {
                let south_tree = forest[i][c];

                if south_tree <= *t {
                    south_scenic_score += 1;
                }

                if south_tree >= *t {
                    is_visible_south = false;
                    break;
                }
            }
            scenic_score *= south_scenic_score;

            if is_visible_north || is_visible_west || is_visible_east || is_visible_south {
                visible += 1;
            }

            if scenic_score > highest_scenic_score {
                highest_scenic_score = scenic_score;
            }
        }
    }
    println!("Total visible: {:?}", visible);
    println!("Highest Scenic Score: {:?}", highest_scenic_score);
}
