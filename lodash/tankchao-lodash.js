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
			result.push(array.slice(i * size, i * size + size))
		}
		if (l !== size * n) {
			result.push(array.slice(size * n))
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
		var result = []
		var b = []
		var bIdx
		var al = array.length
		for (var v = 1; v < arguments.length; v++) {
			b = b.concat(arguments[v])
		}
		for (var a = 0; a < al; a++) {
			bIdx = b.indexOf(array[a])
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
		for (var i = start; i < end; i++) {
			result.push(value)
		}
		result = result.concat(array.slice(end))
		return result
	},

	flatten: function (array) {
		var result = []
		for (var i = 0; i < array.length; i++) {
			if (!(Array.isArray(array[i]))) {
				result.push(array[i])
			} else {
				for (var j = 0; j < array[i].length; j++) {
					result.push(array[i][j])
				}
			}
		}
		return result
	},

	flattenDeep: function (array) {
		var result = []
		var strs = array.toString()
		var re = /\,/g
		str = strs.replace(re, "")
		for (var i = 0; i < str.length; i++) {
			result.push(Number(str[i]))
		}
		return result
	},
	fromPairs: function (array) {
		var result = {}
		for (var i = 0; i < array.length; i++) {
			result[array[i][0]] = array[i][1]
		}
		return result
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
			if (array[i] !== array[i] && value !== value) {
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
		var al = arguments.length


		if (al == 1) {
			return arguments[0]
		}
		if (al == 2) {
			for (var i = 0; i < arguments[0].length; i++) {
				var tong = arguments[1].indexOf(arguments[0][i])
				if (tong !== -1) {
					result.push(arguments[0][i])
				}
			}
			return result
		} else {
			var as = []
			for (var i = 0; i < arguments[0].length; i++) {
				var tong = arguments[1].indexOf(arguments[0][i])
				if (tong !== -1) {
					result.push(arguments[0][i])
				}
			}
			if (result == []) {
				return []
			}
			as.push(result)
			for (var a = 2; a < al; a++) {
				as.push(arguments[a])
			}
			tankchao.intersection(...as)

		}
	},
	join: function (array, separator = ',') {
		var str = array.toString()
		var re = /\,/g
		return str.replace(re, separator)
	},
	last: function (array) {
		var result
		result = array[array.length - 1]
		return result
	},
	lastIndexOf: function (array, value, fromIndex = array.length - 1) {
		var result = []
		if (fromIndex < 0) {
			return -1
		}
		for (var i = fromIndex; i >= 0; i--) {
			if (value == array[i]) {
				result.push(i)
			}
			if (value !== value && array[i] !== array[i]) {
				result.push(i)
			}
		}
		if (result.legnth == 0) {
			result.push(-1)
		}
		return result[0]
	},
	pull: function (array, ...values) {
		var result = array
		var str = result.join()
		var value = []
		for (var i = 1; i < arguments.length; i++) {
			value.push(arguments[i])
		}
		for (var v = 0; v < value.length; v++) {
			var re = new RegExp(value[v] + "\,\|\," + value[v], "g")
			str = str.replace(re, "")
		}
		array = str.split(",")
		return array
	},
	reverse: function (array) {
		var result = []
		for (var i = array.length - 1; i >= 0; i--) {
			result.push(array[i])
		}
		return result
	},
	sortedIndex: function (array, value) {
		var result = []
		for (var i = 0; i < array.length; i++) {
			if (array[i] < value) {
				result.push(array[i])
			} else {
				result.push(value)
			}
		}
		return result.indexOf(value)
	},
	union: function (...array) {
		var result = []
		var al = arguments.length

		for (var j = 0; j < al; j++) {
			for (var i = 0; i < arguments[j].length; i++) {
				var reIndex = result.indexOf(arguments[j][i])
				if (reIndex == -1) {
					result.push(arguments[j][i])
				}
			}
		}
		return result
	},
	unionBy: function (...array) {

	},
	unzip: function (array) {
		var result = []
		var al = array.length
		for (var i = 0; i < al; i++) {

			for (var j = 0; j < array[i].length; j++) {
				if (!result[j]) {
					result[j] = []
				}
				result[j].push(array[i][j])
			}

		}
		return result
	},
	without: function (array, ...values) {
		var ary = []
		var result = array
		var argu = arguments.length
		for (var i = 1; i < argu; i++) {

			var al = result.length
			for (var j = 0; j < al; j++) {
				if (result[j] !== arguments[i]) {
					ary.push(result[j])
				}
			}
			result = ary
			ary = []
		}
		return result
	},
	xor: function (...array) {
		var result = []
		var ary = []
		for (var i = 0; i < array.length; i++) {
			result = result.concat(array[i])
		}
		for (var j = 0; j < result.length; j++) {
			if (result.indexOf(result[j]) == result.lastIndexOf(result[j])) {
				ary.push(result[j])
			}
		}
		return ary
	},
}