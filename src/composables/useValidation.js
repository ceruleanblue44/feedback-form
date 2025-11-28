import { reactive, ref } from 'vue'

export function useValidation(isMobile, step) {
	const formSubmitted = ref(false)
	const showErrorScreen = ref(false)
	const showValidation = ref(false)

	const initialState = {
		name: '',
		email: '',
		phone: '',
		level: '',
		more: '',
		rating: 0,
		quickReplies: [],
	}

	const form = reactive({ ...initialState })

	const errors = reactive({
		name: null,
		email: null,
		phone: null,
		level: null,
		more: null,
		rating: null,
		quickReplies: null,
	})

	const onBlur = (field, value) => {
		if (field === 'name') errors.name = value ? null : 'Ошибка'
		if (field === 'email') {
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			errors.email = !value
				? 'Ошибка'
				: !emailRegex.test(value)
				? 'Ошибка'
				: null
		}
		if (field === 'phone') {
			errors.phone =
				!value || value.replace(/\D/g, '').length < 11 ? 'Ошибка' : null
		}
		if (field === 'level') errors.level = value ? null : 'Ошибка'
	}

	const formatPhone = (value) => {
		if (!value) return ''
		const digits = value.replace(/\D/g, '').slice(0, 11)
		let result = '+7 '
		if (digits.length > 1) result += `(${digits.slice(1, 4)}`
		if (digits.length >= 4) result += `) ${digits.slice(4, 7)}`
		if (digits.length >= 7) result += ` ${digits.slice(7, 9)}`
		if (digits.length >= 9) result += ` ${digits.slice(9, 11)}`
		return result
	}

	const onInput = (field, value) => {
		if (field === 'phone') {
			const digits = value.replace(/\D/g, '').slice(0, 11)
			value = formatPhone(digits)
		}
		form[field] = value
	}

	const submitForm = () => {
		Object.keys(form).forEach((key) => onBlur(key, form[key]))

		formSubmitted.value = true
		showValidation.value = true

		const hasErrors = Object.values(errors).some((err) => err)

		if (hasErrors) {
			showErrorScreen.value = true

			if (isMobile) {
				const step1Fields = ['name', 'email', 'phone']
				const firstErrorField = Object.keys(errors).find((k) => errors[k])
				step.value = step1Fields.includes(firstErrorField) ? 1 : 2
			}

			return
		}
	}

	const resetForm = () => {
		formSubmitted.value = false
		showValidation.value = false
		showErrorScreen.value = false
		step.value = 1

		Object.assign(form, initialState)
		Object.keys(errors).forEach((key) => {
			errors[key] = null
		})
	}

	const backToForm = () => {
		showErrorScreen.value = false
		formSubmitted.value = false
		step.value = 1
		showValidation.value = true
	}

	const onKeydown = (e) => {
		const digits = form.phone.replace(/\D/g, '')
		if (digits.length >= 11 && /[0-9]/.test(e.key)) {
			e.preventDefault()
		}
	}

	const onSelectInput = () => {
		errors.level = null
	}

	return {
		form,
		errors,
		formSubmitted,
		showErrorScreen,
		showValidation,
		onInput,
		onBlur,
		submitForm,
		resetForm,
		backToForm,
		onKeydown,
		onSelectInput,
	}
}
