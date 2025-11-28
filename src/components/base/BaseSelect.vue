<script setup>
import { computed } from 'vue'

const props = defineProps({
	modelValue: {
		type: String,
		default: '',
	},
	label: {
		type: String,
		default: '',
	},
	showValidation: {
		type: Boolean,
		default: false,
	},
	error: {
		type: String,
		default: '',
	},
	options: {
		type: Array,
		default: () => [],
	},
	name: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['update:modelValue', 'blur'])

const id = computed(
	() =>
		props.name || props.label || 'select-' + Math.random().toString(36).slice(2)
)

const levels = [
	{ label: 'Junior', value: 'junior' },
	{ label: 'Middle', value: 'middle' },
	{ label: 'Senior', value: 'senior' },
	{ label: 'Team lead', value: 'team lead' },
]
</script>

<template>
	<div class="base-select base-input">
		<label :for="id" v-if="label">{{ label }}</label>

		<select
			:id="id"
			:value="modelValue"
			@input="$emit('update:modelValue', $event.target.value)"
			@blur="$emit('blur', $event.target.value)"
			:class="{ 'has-error': error }">
			<option value="" disabled selected hidden>Выберите</option>
			<option
				v-for="option in levels"
				:key="option.value"
				:value="option.value">
				{{ option.label }}
			</option>
		</select>

		<div class="error" v-if="error">
			<img src="../../assets/icons/field-error.svg" alt="" width="10" />
			<p>{{ error }}</p>
		</div>
		<div class="success" v-if="!error && modelValue && showValidation">
			<img src="../../assets/icons/field-success.svg" alt="" width="10" />
			<p>Супер</p>
		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../../styles/variables' as *;
$arrow-down: url("data:image/svg+xml;utf8,<svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.75 0.75L6.75 6.75L12.75 0.75' stroke='%23170F49' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>");
$arrow-up: url("data:image/svg+xml;utf8,<svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M12.75 6.75L6.75 0.75L0.75 6.75' stroke='%234A3AFF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>");

.base-select {
	&.base-input {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	label {
		font-size: $fs-small;
		line-height: $lh-small;
		color: $neutral-600;
	}

	select {
		padding: 0.875rem 1rem;
		font-size: $fs-base;
		font-family: inherit;

		border-radius: 0.5rem;
		background-color: $neutral-200;
		border: 1px solid transparent;
		color: $neutral-600;

		cursor: pointer;
		outline: none;
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;

		background-image: $arrow-down;
		background-repeat: no-repeat;
		background-position: calc(100% - 1rem) center;
		background-size: 14px 8px;
	}

	select:focus {
		border-color: $primary;
		background-image: $arrow-up;
		color: $neutral-800;
	}

	select:target {
		border-color: red;
		background-image: $arrow-down;
		color: red;
	}

	select.has-error {
		border-color: $error;
	}

	select.has-error {
		background-image: url("data:image/svg+xml;utf8,<svg width='14' height='8' viewBox='0 0 14 8' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.75 0.75L6.75 6.75L12.75 0.75' stroke='%23E53935' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>");
	}

	select:disabled {
		background-color: $neutral-300;
		color: $neutral-600;
		cursor: default;
	}
}
</style>
