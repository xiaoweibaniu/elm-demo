module.exports = {
  devServer: {
    open: true,
    port: 8000,
    proxy: {
      "/v1": {
        target: "http://cangdu.org:8001"
      }
    }
  }
};
