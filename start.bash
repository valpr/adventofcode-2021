#!/usr/bin/env bash

# This script will run the current AOC based on day of the month
# options:
# $1: day to run
# $2: part to run (1 or 2)
# $3: input to use (u for input.txt, p for practiceInput.txt)
# ex: "npm start 1 07 p" runs day 7 part 1 on practice input
# default behaviour is run both parts for current day of the month
day=$(date +"%d") && [[ "$2" != "" ]] && day=$2
userInput="./input/day$day/input.txt"
practiceInput="./input/day$day/practiceInput.txt"

if [[ $1 != "" ]]
then
    echo "Day $day part $1:"
    if [[ ($3 = "p") || $3 = "" ]]
    then
    echo "Practice input:"
    npx ts-node "src/day$day/part0$1.ts" $practiceInput
    fi
    if [[ ($3 = "u") || $3 = "" ]]
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
