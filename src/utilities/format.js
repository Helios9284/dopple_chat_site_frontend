import moment from "moment"
import { monthNames } from "../config";

export const validateEmail = (email) => {
    return String(email).toLowerCase().match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

export function clearNumber(value = '') {
    return value.replace(/\D+/g, '')
}

export function commafy(num) {
    if (!num) {
        return 0;
    }

    var str = num.toString().split('.');
    if (str[0].length >= 4) {
        str[0] = str[0].replace(/(\d)(?=(\d{3})+$)/g, '$1,');
    }
    if (str[1] && str[1].length >= 4) {
        str[1] = str[1].replace(/(\d{3})/g, '$1 ');
    }
    return str.join('.');
}

export const copyCode = (text) => {
    if (navigator.clipboard && window.isSecureContext)
        navigator.clipboard.writeText(text)
    else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = text;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}

export const groupArr = (data, n) => {
    var group = [];
    for (var i = 0, j = 0; i < data.length; i++) {
        if (i >= n && i % n === 0)
            j++;
        group[j] = group[j] || [];
        group[j].push(data[i])
    }
    return group;
}

export const arrange = (data) => {
    return data.concat(Array(9 - data.length).fill("empty"))
}

export const getMultipleRandom = (arr, num) => {
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, num);
}

export const getFeaturedByCategory = (data) => {
    let tmp = []
    tmp.push(data.filter(x => x.category === 0)[0])
    tmp.push(data.filter(x => x.category === 1)[0])
    tmp.push(data.filter(x => x.category === 2)[0])
    tmp.push(data.filter(x => x.category === 3)[0])
    return tmp
}

export const getLastMsgDate = (timestamp) => {
    const lastDate = new Date(timestamp)
    const now = new Date()
    var diffMs = (now - lastDate);
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    var diffDays = Math.floor(diffMs / 86400000); // days

    if (diffMins === 0) return "Just now"
    else if (diffMins === 1 || diffMins === -1) return "Just now"
    else if (diffDays === 1) return "Yesterday"
    else if (diffDays === 7) return "A week ago"
    else if (diffDays === 31) return "A month ago"
    else if (diffDays === 365) return "A year ago"
    else if (diffDays === 0) return moment(lastDate).format("hh:mm a").toUpperCase()
    else if (diffDays > 1 && diffDays < 7) return (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear()
    else return (lastDate.getMonth() + 1) + "/" + lastDate.getDate() + "/" + lastDate.getFullYear()
}

export const range = (min, max) => { // min and max included
    return (Math.random() * (max - min + 1) + min).toFixed(1)
}

export const sortByVolume = (arr) => { // min and max included
    return arr.sort((a, b) => parseFloat(b.messageCount) - parseFloat(a.messageCount))
}

export const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (yesterday.toDateString() === date.toDateString()) {
        return true;
    }

    return false;
}

export const threadDate = (date) => {
    const now = new Date();
    if (now.getFullYear() === date.getFullYear() && now.getMonth() === date.getMonth() && now.getDate() === date.getDate())
        return "Today"
    else if (isYesterday(date))
        return "Yesterday"
    else
        return date.getDate() + " " + monthNames[date.getMonth()]
}

export const getMobileOperatingSystem = () => {
    var userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    return "unknown";
}

export const getDaysBetweenDates = (d1, d2) => {
    const _d1 = new Date(d1.getFullYear() + "/" + (d1.getMonth() + 1) + "/" + d1.getDate()) * 1
    const _d2 = new Date(d2.getFullYear() + "/" + (d2.getMonth() + 1) + "/" + d2.getDate()) * 1
    return Math.abs(_d1 - _d2) / 36e5 / 24
}

export const getFormattedNumbers = (count) => {
    if (count / 1000 >= 1) {
        if (count / 1000 / 1000 >= 1) return (count / 1000 / 1000).toFixed(2) + "m"
        else
            return (count / 1000).toFixed(1) + "k"
    }
}