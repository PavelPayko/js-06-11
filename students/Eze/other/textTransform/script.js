class ChangeText {
    constructor(text = '.text') {
        this.text = text;
        this.replaceQuotes();
    }
    replaceQuotes() {
        const text = document.querySelector('.text');
        const newText = document.querySelector('.newText');
        let re = /'/g;
        let res = text.innerHTML.replace((re), '"');

        re = /\b"\b/g;
        res = res.replace((re), '\'');

        let div = document.createElement('div');
        div.className = "newText";
        div.innerHTML = res;

        document.body.append(div);
    }

}
