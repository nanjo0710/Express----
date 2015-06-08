
/*
 * GET home page.
 */

exports.index = function (req, res) {

    var pages = [
    { name: 'users', path: 'users', memo: 'user.list' },
    { name: 'ab?cd', path: 'abcd', memo: 'will match acd and abcd' },
    { name: 'ab+cd', path: 'abbcd', memo: 'will match abcd, abbcd, abbbcd, and so on' },
    { name: 'ab*cd', path: 'abxcd', memo: 'will match abcd, abxcd, abRABDOMcd, ab123cd, and so on' },
    { name: 'ab(cd)?e', path: 'abe', memo: 'will match /abe and /abcde' },
    { name: 'ab?cd', path: 'acd', memo: 'will match acd and abcd' },
    { name: 'abcd', path: 'ab?cd', memo: 'will match acd and abcd' },
    { name: 'abcd', path: 'ab?cd', memo: 'will match acd and abcd' },
    { name: 'abcd', path: 'ab?cd', memo: 'will match acd and abcd' },
    { name: 'abcd', path: 'ab?cd', memo: 'will match acd and abcd' },
    { name: 'abcd', path: 'ab?cd', memo: 'will match acd and abcd' },
    { name: 'abcd', path: 'ab?cd', memo: 'will match acd and abcd' },
    { name: 'abcd', path: 'ab?cd', memo: 'will match acd and abcd' },
    { name: 'abcd', path: 'ab?cd', memo: 'will match acd and abcd' }];

    res.render('index', { title: 'Express', pages: pages });
};