<script setup>
import { computed, ref, watch } from 'vue'

const props = defineProps({
	rating: {
		type: Number,
		default: 0,
	},
	modelValue: {
		type: Array,
		default: () => [],
	},
})

const replySets = {
	bad: [
		'Не понятно',
		'Однообразно',
		'Скучно',
		'Неудобно',
		'Ничего не понял',
		'Слишком сложно для тестового',
	],
	average: [
		'Нормик',
		'Легко',
		'Быстро сделал',
		'Долго разбирался',
		'Не понравилось',
	],
	good: [
		'Интересно',
		'Легко',
		'Быстро сделал',
		'Красиво',
		'Подробно описано',
		'Все понятно и по делу',
	],
}

const currentReplies = computed(() => {
	if (props.rating === 1 || props.rating === 2) return replySets.bad
	if (props.rating === 3) return replySets.average
	if (props.rating >= 4) return replySets.good
})

const emit = defineEmits(['update:modelValue'])

const selected = ref([])

watch(
	() => props.modelValue,
	(newVal) => {
		selected.value = [...newVal]
	},
	{ immediate: true }
)

function toggle(item) {
	const idx = selected.value.indexOf(item)
	if (idx >= 0) selected.value.splice(idx, 1)
	else selected.value.push(item)
	emit('update:modelValue', selected.value)
}
</script>

<template>
	<div class="quick-replies" v-if="props.rating > 0">
		<button
			v-for="(reply, idx) in currentReplies"
			:key="idx"
			type="button"
			:class="[
				'quick-replies__btn',
				{ 'quick-replies__btn--selected': selected.includes(reply) },
			]"
			@click="toggle(reply)">
			{{ reply }}
		</button>
	</div>
</template>

<style scoped lang="scss">
@use './../styles/variables' as *;

.quick-replies {
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
	margin-bottom: 2.25rem;

	@media (max-width: $mobile) {
		margin-bottom: 1rem;
	}

	&__btn {
		padding: 0.325rem 1rem;
		border-radius: 100px;
		background: $neutral-300;
		font-size: $fs-base;
		line-height: $lh-base;
		color: $neutral-800;
		transition: background $transition;

		@media (hover: hover) {
			&:hover {
				background: $neutral-600;
				border-color: $neutral-600;
				color: $neutral-100;
			}
		}

		@media (max-width: $mobile) {
			padding: 0.5rem 0.75rem;
			font-size: $fs-mini;
			line-height: $lh-mini;
		}
	}

	&__btn--selected {
		background: $neutral-600;
		border-color: $neutral-600;
		color: $neutral-100;
	}
}
</style>
