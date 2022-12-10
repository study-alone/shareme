export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc) {
    image {
        asset -> {
            url
        }
    },
    _id,
    destination,
    postedBy -> {
        _id,
        userName,
        image
    },
    save[] {
        _key,
        postedBy -> {
            _id,
            userName,
            image
        }
    }
}`

export const searchQuery = (search?: string) => {
	const query = `*[_type == "pin" && title match '${search}*' || category match '${search}*' || about match '${search}*']{
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            _key,
            postedBy -> {
                _id,
                userName,
                image
            }
        }
    }`

	return query
}

export const getUserQuery = (userId: string) => {
	if (userId) {
		return `*[_type == "user" && _id == '${userId}']`
	}
}

export const pinDetailQuery = (pinId: string) => {
	const query = `*[_type == "pin" && _id == '${pinId}']{
      image{
        asset->{
          url
        }
      },
      _id,
      title, 
      about,
      category->{
        _id,
        value
      },
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
     save[]{
        postedBy->{
          _id,
          userName,
          image
        },
      },
      comments[]{
        comment,
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      }
    }`
	return query
}

export const pinDetailMorePinQuery = ({ category, _id }: { category?: string; _id?: string }) => {
	console.log({ category })
	const categoryFilter = category ? `&& references('${category}')` : ''
	const _idFilter = _id ? `&& _id != "${_id}"` : ''
	const query = `*[_type == "pin" ${_idFilter} ${categoryFilter} ]{
      image{
        asset->{
          url
        }
      },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    }`
	return query
}

export const userCreatedPinsQuery = (userId: string) => {
	const query = `*[_type == "pin" && userId == "${userId}"] | order(_createdAt desc) {
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            postedBy -> {
                _id,
                userName,
                image
            }
        }
    }`
	return query
}

export const userQuery = (userId: string) => {
	const query = `*[_type == "user" && _id == "${userId}"]`
	return query
}

export const userSavedPinsQuery = (userId: string) => {
	const query = `*[_type == "pin" && "${userId}" in save[].userId] | order(_createdAt desc) {
        image {
            asset -> {
                url
            }
        },
        _id,
        destination,
        postedBy -> {
            _id,
            userName,
            image
        },
        save[] {
            postedBy -> {
                _id,
                userName,
                image
            }
        }
    }`
	return query
}

export const categoryQuery = () => {
	return `*[_type == "category"]`
}
