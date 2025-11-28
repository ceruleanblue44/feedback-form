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
	error: {
		type: String,
		default: '',
	},
	showValidation: {
		type: Boolean,
		default: false,
	},
	type: {
		type: String,
		default: 'text',
	},
	name: {
		type: String,
		default: '',
	},
	placeholder: {
		type: String,
		default: '',
	},
	autocomplete: {
		type: String,
		default: '',
	},
})

const emit = defineEmits(['update:modelValue', 'input', 'blur'])

const id = computed(
	() =>
		props.name || props.label || 'input-' + Math.random().toString(36).slice(2)
)
</script>

<template>
	<div class="base-input">
		<label :for="id" v-if="label">{{ label }}</label>

		<input
			:id="id"
			:type="type"
			:value="modelValue"
			:placeholder="placeholder"
			:autocomplete="autocomplete"
			:class="{ 'has-error': error }"
			@input="
				(e) => {
					emit('update:modelValue', e.target.value)
					emit('input', e.target.value)
				}
			"
			@blur="$emit('blur', modelValue)" />


		<div class="error" v-if="error && showValidation">
			<img src="../../assets/icons/field-error.svg" alt="" width="10"/>
			<p>{{ error }}</p>
		</div>
		<div class="success" v-if="showValidation && error === null && modelValue">
			<img src="../../assets/icons/field-success.svg" alt="" width="10"/>
			<p>Супер</p>
		</div>
	</div>
</template>
