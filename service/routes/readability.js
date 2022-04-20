const read = require('node-readability');

read('https://baike.baidu.com/item/SQLite/375020?fr=aladdin', (err, res) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log(res.title, res.content);
})