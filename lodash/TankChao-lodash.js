var TankChao = {
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
	chunk: function (ary, size = 1) {
		var a = []
		var result = []
		var l = ary.length
		var n = Math.floor(l / size)
		for (var i = 0; i < n; i++) {
			result.push(ary.slice(0, size * n))
			a.push(result)
			result.pop()
		}
		if (l !== size * n) {
			result.push(ary.slice(size * n))
			a.push(result)
			result.pop()
		}
		return a
	},
	compact: function (ary) {
		var result = []
		for (var i = 0; i < ary, length; i++) {
			if (ary[i]) {
				result.push(ary[i])
			}
		}
		return result
	},
}