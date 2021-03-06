angular.module('app').service('containerSrv', function ($http) {
    // »»»»»»»»»»»»»»»»»»»║ TESTS
    this.containerServiceTest = 'the containerSrv is connected'

    // »»»»»»»»»»»»»»»»»»»║ ENDPOINTS
    this.name 
    // ...................  get containers
    this.getContainerList = () => ($http.get('/api/containers'))
    // ...................  create containers
    this.createContainer = (data) => {
        $http({
            url: '/api/containers',
            method: 'POST',
            data: data
        })
    }
    // ...................  update containers
    this.updateContainer = (id, data) => {
        $http({
            url: '/api/containers/' + id,
            method: 'PUT',
            data: data
        })
    }
    // ...................  delete containers
    this.deleteContainer = (id) => {
        $http({
            url: '/api/containers/' + id,
            method: 'DELETE'
        })
    }
})