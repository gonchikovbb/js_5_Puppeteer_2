Feature: Booking ticket
    Scenario: Should book one seat
        Given user is on "qamid" page
        When user chooses 2-th day and seance
        When user chooses seat 7 in row 4
        Then user sees text

    Scenario: Should book two seats
        Given user is on "qamid" page
        When user chooses 2-th day and seance
        When user chooses 3 row and 3,4 seats
        Then user sees text

    Scenario: Should not book
        Given user is on "qamid" page
        When user chooses 2-th day and seance
        When user click "button"