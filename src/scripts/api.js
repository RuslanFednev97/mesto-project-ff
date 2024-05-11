const config = {
        baseUrl: "https://nomoreparties.co/v1/wff-cohort-12",
        headers: {
            authorization: '24b8b0d1-481d-4ff4-84c2-2d32056579ad'     
        }
      };
    

// export const handleResponse = (response) => {
//     if (response.ok) {
//         return response.json();
//     }
// }

const handleResponse = (res) => {
    if (res.ok) {
      return res.json(); 
    } else {
      return Promise.reject(`Ошибка: ${res.status}`);
      
    }
  };

//Загрузка информации о пользователе с сервера
export const userInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
        .then(handleResponse)
}

//Загрузка карточек с сервера
export const card = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
        .then(handleResponse)
}

// Редактирование профиля
export const editProfile = (dataName, dataJob) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: dataName, 
            about: dataJob
        })
      })
          .then(handleResponse)
          
}

// Добавление новой карточки
export const addingCard = (data) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(handleResponse)
}

//Удаление карточки
export const apiDeleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: config.headers.authorization,
      }
    })
    .then(handleResponse)
}

//Лайк карточки
export const putLike = (cardId) => {
   return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: {
        authorization: config.headers.authorization,
      }
    })
    .then(handleResponse)
  };
  
//Удаление лайка карточки
export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: config.headers.authorization,
      }
    })
    .then(handleResponse)
  };

//Обновление аватара
export const patchAvatar = (data) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      .then(handleResponse)
}