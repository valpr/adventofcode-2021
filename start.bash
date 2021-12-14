#!/usr/bin/env bash

# This script will run the current AOC based on day of the month
# options:
# $1: part to run (1 | 2)
# $2: input to use (u for input.txt, p for practiceInput.txt)
# $3: day to run
# ex: "npm start 1 p 07" runs part 1 practice input for day 7
# default behaviour is run both parts for current day of the month
day=$(date +"%d") && [[ "$3" != "" ]] && day=$3
userInput="./input/day$day/input.txt"
practiceInput="./input/day$day/practiceInput.txt"

if [[ $1 != "" ]]
then
    echo "Day $day part $1:"
    if [[ ($2 = "p") || $2 = "" ]]
    then
    echo "Practice input:"
    npx ts-node "src/day$day/part0$1.ts" $practiceInput
    fi
    if [[ ($2 = "u") || $2 = "" ]]
    then
    echo "Real input:"
    npx ts-node "src/day$day/part0$1.ts" $userInput
    fi
else
    echo "Day $day part 1:"
    echo "Practice input:"
    npx ts-node "src/day$day/part01.ts" $practiceInput
    echo "Real input:"
    npx ts-node "src/day$day/part01.ts" $userInput
    echo "Day $day part 2:"
    echo "Practice input:"
    npx ts-node "src/day$day/part02.ts" $practiceInput
    echo "Real input:"
    npx ts-node "src/day$day/part02.ts" $userInput
fi
