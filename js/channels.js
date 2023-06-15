const mockChannels = [
    {   
        id: "0nlbop5f1e",
        name: "MeetUp",
        favorite: true,
        messages : [],
        latestMessage () {
            if (!!this.messages.length){
                const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
                // if message is from yesterday or older, display date, else display time
                if (new Date().getDate() - latest.getDate() > 1) {
                    return latest.toLocaleDateString(browserLanguage, {year:"numeric", month:"numeric", day: "numeric"})
                } else {
                    return latest.toLocaleTimeString(browserLanguage, {hour:"numeric", minute:"numeric"})
                }
            } else {
                return "No Messages"
            }
        }
    },
    {
        id: "6xwd0whqpv",
        name: "Oktoberfest",
        favorite: true,
        messages: [],
        latestMessage () {
            if (!!this.messages.length){
                const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
                // if message is from yesterday or older, display date, else display time
                if (new Date().getDate() - latest.getDate() > 1) {
                    return latest.toLocaleDateString(browserLanguage, {year:"numeric", month:"numeric", day: "numeric"})
                } else {
                    return latest.toLocaleTimeString(browserLanguage, {hour:"numeric", minute:"numeric"})
                }
            } else {
                return "No Messages"
            }
        }
    },
    {   
        id: "pc2z0hhkyf",
        name: "Weather",
        favorite: false,
        messages: [],
        latestMessage () {
            if (!!this.messages.length){
                const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
                // if message is from yesterday or older, display date, else display time
                if (new Date().getDate() - latest.getDate() > 1) {
                    return latest.toLocaleDateString(browserLanguage, {year:"numeric", month:"numeric", day: "numeric"})
                } else {
                    return latest.toLocaleTimeString(browserLanguage, {hour:"numeric", minute:"numeric"})
                }
            } else {
                return "No Messages"
            }
        }
    },
    {
        id: "achndt7tst",
        name: "SevenContinents",
        favorite: false,
        messages: [],
        latestMessage () {
            if (!!this.messages.length){
                const latest = new Date(Math.max(...this.messages.map(x => x.createdOn)));
                // if message is from yesterday or older, display date, else display time
                if (new Date().getDate() - latest.getDate() > 1) {
                    return latest.toLocaleDateString(browserLanguage, {year:"numeric", month:"numeric", day: "numeric"})
                } else {
                    return latest.toLocaleTimeString(browserLanguage, {hour:"numeric", minute:"numeric"})
                }
            } else {
                return "No Messages"
            }
        }
    }
];