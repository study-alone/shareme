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
	if (!search) return null
	const query = `*[_type == "pin" && title match '${search}*' || category match '${search}*' || about match '${search}*']{
        image {
            asset => {
                url
            }
        },
        _id,
        destination,
        postedBy => {
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
      category,
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
	const query = `*[_type == "pin" ${category ? `&& category == '${category}'` : ''} ${
		_id ? `&& _id != '${_id}'` : ''
	} ]{
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
