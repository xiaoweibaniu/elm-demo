<template>
  <div class="alert_container">
    <section class="tip_text_container">
      <div class="close_alert" @click="closeAlert">x</div>
      <div class="tip_icon">
        <span></span>
        <span></span>
      </div>
      <p class="alert_text">{{ alertText }}</p>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: ["alertText"],
		methods: {
      closeAlert(){
          this.$emit('closeAlert')
      }
		}
};
</script>

<style lang="scss">
@import "../../assets/styles/mixin";
@keyframes tipMove {
  0% {
    transform: scale(1);
  }
  35% {
    transform: scale(0.8);
  }
  70% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.alert_container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .tip_text_container {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 500px;
    margin-left: -250px;
    margin-top: -180px;
    padding-bottom: 25px;
    animation: tipMove 0.4s;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: rgba(255, 255, 255, 1);
    border: 1px solid #ffcb67;
    border-radius: 8px;
    .close_alert {
      @include wh(100%, 80px);
      @include sc(36px, red);
      padding-right: 20px;
      border-radius: 8px 8px 0 0;
      line-height: 80px;
      text-align: right;
      background-color: #ffcb67;
    }
    .tip_icon {
      @include wh(120px, 120px);
      border: 4px solid #ffcb67;
      border-radius: 50%;
      margin: 40px 190px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      span:nth-of-type(1) {
        @include wh(6px, 50px);
        background-color: #ffcb67;
      }
      span:nth-of-type(2) {
        @include wh(8px, 8px);
        border: 1px;
        border-radius: 50%;
        margin-top: 8px;
        background-color: #ffcb67;
      }
    }
    .alert_text {
      @include sc(32px, #333);
      text-align: center;
      margin-top: 30px;
    }
  }
}
</style>
