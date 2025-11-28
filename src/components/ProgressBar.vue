<script setup>
import { computed } from 'vue'

const props = defineProps({
	step: {
		type: Number,
		required: true,
	},
	form: {
		type: Object,
		required: true,
	},
	totalFields: {
		type: Number,
		default: 7,
	},
})

const filledCount = computed(() => {
	let count = 0
	if (props.form.name) count++
	if (props.form.email) count++
	if (props.form.phone) count++
	if (props.form.rating) count++
	if (props.form.quickReplies && props.form.quickReplies.length) count++
	if (props.form.level) count++
	if (props.form.more) count++
	return count
})

const lineWidth = computed(() => (filledCount.value / props.totalFields) * 100)

const isStep1Active = computed(() => props.step === 1 || filledCount.value > 0)
const isStep2Active = computed(
	() => props.step === 2 || filledCount.value === props.totalFields
)
</script>

<template>
	<div class="feedback__steps">
		<div
			class="feedback__step"
			:class="{ 'feedback__step--active': isStep1Active }">
			1
		</div>

		<div class="feedback__line">
			<div
				class="feedback__line-fill"
				:style="{ width: lineWidth + '%' }"></div>
		</div>

		<div
			class="feedback__step"
			:class="{ 'feedback__step--active': isStep2Active }">
			2
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../styles/variables' as *;

.feedback {
	&__steps {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		margin-bottom: 1.25rem;
	}

	&__step {
		width: 34px;
		height: 34px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: $fs-base;
		line-height: $fs-h5;
		color: $neutral-600;
		background: $neutral-300;
	}

	&__step--active {
		background: $primary;
		color: $neutral-100;
	}

	&__line {
		flex-shrink: 0;
		width: 98px;
		height: 6px;
		border-radius: 1rem;
		background: $neutral-300;
		position: relative;
		overflow: hidden;
	}

	&__line-fill {
		height: 100%;
		background: $primary;
		width: 0%;
		transition: width $transition;
		border-radius: 1rem;
	}
}
</style>
