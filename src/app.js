class Carousel {
    constructor() {
        this.num = 0;
        this.init();
    }
    init() {
        this.getJson();
    }
    getJson() {
        this.ajax("http://localhost:8080/data").then((res) => {
            const data = JSON.parse(res)
            this.btnLeft(data);
            this.btnRight(data);
            this.appendImg(data, this.num);
        });
    }
    appendImg(data, num) {
        const box = document.getElementsByClassName('box')[0];
        data.map((v, i) => {
            box.innerHTML = ''
            this.createImg(v.img).then((resolve) => {
                const lis = document.createElement('li');
                lis.style.display = "none";
                if (i == num) {
                    lis.style.display = "block";
                    lis.append(resolve)
                }
                box.append(lis)
            })
        })
    }
    ajax(url) {
        return new Promise((resolve, reject) => {
            let xml = new XMLHttpRequest();
            xml.open('get', url, true);
            xml.onreadystatechange = () => {
                if (xml.readyState == 4) {
                    if (xml.status == 200) {
                        resolve(xml.responseText);
                    } else {
                        reject('error')
                    }
                }
            }
            xml.send(null)
        })
    }
    createImg(src) {
        return new Promise((res, rej) => {
            let image = document.createElement('img');
            image.onload = () => {
                res(image)
            }
            image.onerror = () => {
                rej('error')
            }
            image.src = src;
        })
    }
    btnLeft(data) {
        const left = document.getElementsByClassName('left')[0];
        left.addEventListener('click', () => {
            this.num--;
            if (this.num < 0) {
                this.num = data.length - 1
            }
            this.appendImg(data, this.num)
        })
    }
    btnRight(data) {
        const right = document.getElementsByClassName('right')[0];
        right.addEventListener('click', () => {
            this.num++;
            if (this.num >= data.length) {
                this.num = 0
            }
            this.appendImg(data, this.num)
        })
    }
}
const carousel = new Carousel();