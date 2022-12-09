use std::collections::HashSet;

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_validate_marker () {
        assert_eq!(validate_marker("abac"), false);
        assert_eq!(validate_marker("abcd"), true);
    }

    #[test]
    fn test_get_marker_index () {
        assert_eq!(get_start_of_packet("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 7);
        assert_eq!(get_start_of_packet("bvwbjplbgvbhsrlpgdmjqwftvncz"), 5);
        assert_eq!(get_start_of_packet("nppdvjthqldpwncqszvftbrmjlhg"), 6);
        assert_eq!(get_start_of_packet("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 10);
        assert_eq!(get_start_of_packet("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 11);
    }

    #[test]
    fn test_get_message_index () {
        assert_eq!(get_start_of_message("mjqjpqmgbljsphdztnvjfqwrcgsmlb"), 19);
        assert_eq!(get_start_of_message("bvwbjplbgvbhsrlpgdmjqwftvncz"), 23);
        assert_eq!(get_start_of_message("nppdvjthqldpwncqszvftbrmjlhg"), 23);
        assert_eq!(get_start_of_message("nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg"), 29);
        assert_eq!(get_start_of_message("zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw"), 26);
    }
}

fn validate_marker (m: &str) -> bool {
    let mut set = HashSet::new();
    for c in m.chars() {
        if !set.insert(c) {
            return false;
        }
    }
    return true;
}

fn get_start_of_packet (m: &str) -> usize {
    get_marker(m, 4)
}

fn get_start_of_message (m: &str) -> usize {
    get_marker(m, 14)
}

fn get_marker (m: &str, s: usize) -> usize {
    for i in 0..=m.len()-s {
        if validate_marker(&m[i..i+s]) {
            return i+s;
        }
    }
    panic!("No marker found");
}

fn main() {
    println!("Day 6!");
    let input = include_str!("input");
    let packet = get_start_of_packet(input);
    let message = get_start_of_message(input);
    println!("Start of packge marker found: {}", packet);
    println!("Start of message marker found: {}", message);
}
