<script setup>
const props = defineProps({
	isMobile: { type: Boolean, required: true },
	step: { type: Number, required: true },
	handleReset: { type: Function, required: true },
})

const emit = defineEmits(['nextStep', 'prevStep', 'submitForm'])
</script>

<template>
	<div class="form-buttons">
		<button
			type="button"
			class="btn border"
			v-if="isMobile && step === 2"
			@click="$emit('prevStep')">
			Назад
		</button>

		<button type="button" class="btn border" @click="handleReset">
			Отменить
		</button>

		<button
			type="button"
			class="btn filled"
			v-if="isMobile && step === 1"
			@click="$emit('nextStep')">
			Далее
		</button>

		<button
			type="button"
			class="btn filled"
			v-if="isMobile && step === 2"
			@click="$emit('submitForm')">
			Отправить
		</button>

		<button
			type="button"
			class="btn filled hide-xs"
			@click="$emit('submitForm')">
			Отправить
		</button>
	</div>
</template>
