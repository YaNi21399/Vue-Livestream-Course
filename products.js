import { createApp } from 'https://unpkg.com/vue@3/dist/vue.esm-browser.js';

const app = {
  data() {
    return{
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'yani2023',
      tempProduct: {},
      products: []
    }
  },
  methods: {
    checkAdmin() {
        const url = `${this.apiUrl}/api/user/check`;
        axios.post(url)
          .then(() => {
            this.getProductsAll()
          })
          .catch(err => {
            alert(err.response.data.message)
            window.location = 'login.html';
          })
    },
    getProductsAll() {
        const url = `${this.apiUrl}/api/${this.apiPath}/admin/products/all`;
        axios.get(url)
            .then(res => {
                // 用products/all取出的資料不是陣列而是物件
                // 物件無法使用陣列方法，因此先將其轉為陣列，否則{{products.length}}會出錯
                this.products = Object.values(res.data.products);
                console.log(this.products)
            })
            .catch(err => {
                alert(err.response.data.message);
            })
    },
    openProduct(item) {
        this.tempProduct = item;
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token;

    this.checkAdmin()
  }
}

createApp(app)
  .mount('#app')