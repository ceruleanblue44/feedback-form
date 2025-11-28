<script setup>
const props = defineProps({
	onReset: { type: Function, required: true },
})
</script>

<template>
	<div class="feedback__success">
		<div class="feedback__header">
			<h2 class="h2 text-center">Спасибо, ваш ответ отправлен</h2>
			<div class="text-small text-neutral-600 text-center">
				Свяжемся с вами в ближайшее время
			</div>
		</div>

		<div class="feedback__image text-center">
			<img src="../assets/icons/success.svg" alt="Success" />
		</div>

		<div class="feedback__footer form-buttons text-center">
			<button type="button" class="btn filled" @click="onReset">
				На главную
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.feedback {

	&__header h2 {
		letter-spacing: -1px;
	}

	&__success {
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	&__image {
		margin: 6rem 0;

		img {
			max-width: 180px;
			width: 100%;
		}

		@media (max-width: $mobile) {
			margin: 2.75rem 0;
		}
	}

	&__footer {
		margin-top: 1.5rem;
		width: 100%;
		display: flex;
		justify-content: center;

		.btn {
			min-width: 150px;
			max-width: 260px;
		}
	}
}
</style>
