<script setup>
const props = defineProps({
	onBackToForm: { type: Function, required: true },
})
</script>

<template>
	<div class="feedback__error">
		<div class="feedback__header">
			<h2 class="h2 text-center">Что-то пошло не так</h2>
			<div class="text-small text-neutral-600 text-center">
				Попробуйте заполнить форму позже
			</div>
		</div>

		<div class="feedback__image text-center">
			<img src="../assets/icons/error.svg" alt="Error" />
		</div>

		<div class="feedback__footer form-buttons text-center">
			<button type="button" class="btn border">Закрыть</button>
			<button type="button" class="btn filled" @click="onBackToForm">
				Попробовать снова
			</button>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.feedback {

	&__error {
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

		@media (max-width: $mobile) {
			flex-direction: column-reverse;
			gap: 1.25rem;
		}
	}
}
</style>
