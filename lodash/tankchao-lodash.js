var tankchao = {
	isNull: function (val) {
		if (val === null) {
			return true
		} else {
			return false
		}
	},
	isNaN: function (val) {
		if (val !== val) {
			return true
		} else {
			return false
		}
	},

	chunk: function (array, size = 1) {
		var result = []
		var l = array.length
		var n = Math.floor(l / size)
		for (var i = 0; i < n; i++) {
			result = result.concat(array.slice(i * size, i * size + size))
		}
		if (l !== size * n) {
			result = result.concat(array.slice(size * n))
		}
		return result
	},

	compact: function (array) {
		var result = []
		for (var i = 0; i < array.length; i++) {
			if (array[i]) {
				result.push(array[i])
			}
		}
		return result
	},

	difference: function (array, ...value) {
		var result = array
		var b = []
		for (var v = 1; v <= arguments.length; v++) {
			b = b.concat(arguments[v])
		}
		for (var a = 0; a < array.length; a++) {
			var bIdx = b.indexOf(array[a])
			if (bIdx == -1) {
				result.push(array[a])
			}
		}
		return result
	},


	drop: function (array, n = 1) {
		var result = array.slice(n)
		return result
	},

	dropRight: function (array, n = 1) {
		var result = []
		var l = array.length
		if (l > n) {
			result = array.slice(0, l - n)
			return result
		} else {
			return []
		}
	},

	fill: function (array, value, start = 0, end = array.length) {
		var result = []
		result = result.concat(array.slice(0, start))
		for (var i = start; i < array.length - 1; i++) {
			result.push(value)
		}
		result = result.concat(array.slice(end - 1))
		return result
	},

	flatten: function (array) {
		var result = []
		for (var i = 0; i < array.length; i++) {
			if (!(Array.isArray(array[i]))) {
				result.push(array[i])
			} else {
				for (var j = 0; j < array[i].length; j++) {
					result.psuh(arrar[i][j])
				}
			}
		}
		return result
	},

	flattenDeep: function (array) {
		var result = []
		var str = array.toString()
		result = str.split(",")
		return result
	},
	fromPairs: function (array) {
		var result = {}
		for (var i = 0; i < array.length; i++) {
			result[array[i][0]] = array[i][1]
		}

	},
	head: function (array) {
		if (array.length == 0) {
			return undefined
		}
		return array[0]
	},
	indexOf: function (array, value, fromIndex = 0) {
		var result = []
		for (var i = fromIndex; i < array.length; i++) {
			if (value == array[i]) {
				result.push(i)
				break
			}
		}
		if (result == []) {
			result.push(-1)
		}
		return result[0]
	},
	initial: function (array) {
		var result = []
		result = array.slice(0, array.length - 1)
		return result
	},
	intersection: function (...array) {
		var result = []
		var arg = []

		for (var a = 2; a < arguments.length; a++) {
			arg = arg.concat(arguments[a])
		}
		for (var i = 0; i < arguments[0].length; i++) {
			for (var j = 0; j < arguments[1].length; j++) {
				if (arguments[0][i] == arguments[1][j]) {
					result.push(arguments[0][i])
				}
			}
		}
		if (result == []) {
			return []
		}
		result = result.concat(arg)
		tankchao.intersection(...result)

		return result
	},
	join: function (array, separator = ',') {
		var str = array.toString()
		var re = /\,/g
		return str.replace(re, separator)
	},
	last: function (array) {
		var result = []
		result.push(array[array.length - 1])
		return result
	},
	lastIndexOf: function (array, value, fromIndex = array.length - 1) {
		var result = []
		for (var i = fromIndex; i >= 0; i--) {
			if (value == array[i]) {
				result.push(i)
			}
		}
		if (result.legnth == 0) {
			result.push(-1)
		}
		return result[0]
	},
}