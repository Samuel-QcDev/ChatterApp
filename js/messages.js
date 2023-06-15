const mockMessages = [
    {
        createdBy: "Jack Blue",
        createdOn: new Date('December 08, 2018 17:24:00'),
        channel: "0nlbop5f1e",
        own: false,
        text: 'What\'s up?',
        yesterdayOrOlder() {
            return new Date().getDate() - this.createdOn.getDate() > 1
        }
    },
    {
        createdBy: "Sam Lassonde",
        createdOn: new Date('December 08, 2018 17:24:30'),
        channel: "0nlbop5f1e",
        own: true,
        text: 'Not much, and you?',
        yesterdayOrOlder() {
            return new Date().getDate() - this.createdOn.getDate() > 1
        }
    },
    {
        createdBy: "Jack Blue",
        createdOn: new Date('December 08, 2018 17:25:00'),
        channel: "0nlbop5f1e",
        own: false,
        text: 'Life is going well!',
        yesterdayOrOlder() {
            return new Date().getDate() - this.createdOn.getDate() > 1
        }
    },
    {
        createdBy: "Sam Lassonde",
        createdOn: new Date('December 08, 2018 17:25:30'),
        channel: "0nlbop5f1e",
        own: true,
        text: 'Glad to hear that!',
        yesterdayOrOlder() {
            return new Date().getDate() - this.createdOn.getDate() > 1
        }
    },
    {
        createdBy: "Jack Blue",
        createdOn: new Date('December 08, 2018 17:24:00'),
        channel: "0nlbop5f1e",
        own: false,
        text: 'So when will you be free to meet up?',
        yesterdayOrOlder() {
            return new Date().getDate() - this.createdOn.getDate() > 1
        }
    }
]