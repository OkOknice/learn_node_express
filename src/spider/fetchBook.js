const axios = require('axios').default
const cheerio = require('cheerio')
const Book = require('../model/Book')

async function getBooksHTML() {
  const res = await axios.get("https://book.douban.com/latest")

  return res.data
}

async function getBooksLink() {
  const html = await getBooksHTML()
  // console.log(res)
  const $ = cheerio.load(html)
  const achorElements = $('#content .grid-16-8 li a.fleft')
  // console.log(achorElements.length)
  const links = achorElements.map((i, ele) => {
    // console.log(ele.attribs['href'])
    return ele.attribs['href']
  })
  // console.log(links)
  return links.get()
}

async function getBooksDetail(url) {
  const res = await axios.get(url)
  // console.log(res.data)
  const $ = cheerio.load(res.data)
  // console.log($('#wrapper h1 span').text())
  const bookName = $('#wrapper h1 span').text()
  // console.log($('#mainpic .nbg img').attr('src'))
  const imgUrl = $('#mainpic .nbg img').attr('src')
  const spans = $('#info span.pl')
  const span = spans.filter((i, ele) => {
    return $(ele).text().includes('作者')
  })
  const ahthor = span.next('a').text()
  const dates = spans.filter((i, ele) => {
    return $(ele).text().includes('出版年')
  })
  // console.log(dates[0].nextSibling.nodeValue.trim())
  const publishDate = dates[0].nextSibling.nodeValue.trim()

  return {
    bookName,
    imgUrl,
    ahthor,
    publishDate
  }
}

async function getAllBooks() {
  const list = await getBooksLink()
  // console.log(list)
  const allBooks = list.map( url => {
    return getBooksDetail(url)
  })
  return Promise.all(allBooks)
}

getAllBooks().then(res => {
  // console.log(res)
  Book.bulkCreate(res)
})