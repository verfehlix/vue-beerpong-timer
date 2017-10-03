<template>
    <div class='main'>

        <nav class='navbar navbar-toggleable navbar-inverse bg-inverse'>
            <a class='navbar-brand' href='#'>Travelmap Data Generator</a>
            <button class='btn navar-buttons btn-outline-info' type='submit' v-on:click="saveButtonClick()">Save</button>
            <button class='btn navar-buttons btn-outline-secondary' type='submit' v-on:click="showLoadModal = true">Load</button>
        </nav>

        <div v-if="showLoadModal" class="modalBackgdrop">
            <div class="modal fade">
                <div class="modal-dialog">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Load .json-File</h5>
                        <button type="button" class="close" v-on:click="showLoadModal = false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>Please select a .json-File.</p>

                        <form id="jsonFile" name="jsonFile" enctype="multipart/form-data" method="post">
                            <fieldset>
                                <input type='file' id='fileinput'>
                            </fieldset>
                        </form>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-info" v-on:click="loadFile()">Load</button>
                    </div>
                    </div>
                </div>
            </div>
        </div>

        <div class='row panelRow'>
            <div class='col-2 panel placeListPanel'>
                <h3>Places - List</h3>

                <h6 v-if="travelData.places.length === 0">Load a .json-File or add a new place via the button at the bottom!</h6>

                <div  class="placeListWrapper">
                    <div class="list-group">
                        <draggable id="draggablePlaceList" v-model="travelData.places" @end="placeListDragEnd">
                            <div v-bind:ref="'listItem' + index" v-on:click="listPlaceClicked(place, index)" v-bind:key="index" v-for="(place, index) in travelData.places" class="list-group-item list-group-item-action flex-column align-items-start placeListItem">
                                <div class="d-flex w-100 justify-content-between">
                                    <h5 class="mb-1">{{ place.name }}</h5>
                                    <small># {{ index + 1 }}</small>
                                </div>
                                <p class="mb-1 placeListDescription">{{ place.description }}</p>
                                <span class="badge badge-info">ID: {{ place.id }}</span>
                            </div>
                        </draggable>
                    </div>
                </div>

                <button class='btn floating-button btn-info btn-lg' type='submit' v-on:click="createNewListPlace()" >+</button>
            </div>
            <div class='col-3 panel editPlacePanel'>
                <h3>Edit Place</h3>

                <h6 v-if="!selectedPlace">Select a place on the left to edit it!</h6>

                <form v-if="selectedPlace">
                    <div class="form-group">
                        <label for="idInput"><b>ID</b></label>
                        <input type="text" class="form-control" id="idInput" placeholder="Enter place ID" v-model="selectedPlace.id">
                        <small id="emailHelp" class="form-text text-muted">This will uniquely identify the place (e.g. for the URL), should not contain special characters etc.</small>
                    </div>

                    <div class="form-group">
                        <label for="nameInput"><b>Name</b></label>
                        <input type="text" class="form-control" id="nameInput" placeholder="Enter name of the place" v-model="selectedPlace.name">
                        <small id="emailHelp" class="form-text text-muted">Can contain spaces, special characters etc.</small>
                    </div>

                    <div class="form-group">
                        <label for="descriptionTextArea"><b>Description</b></label>
                        <textarea class="form-control" id="descriptionTextArea" rows="20" placeholder="Enter a description for the place" v-model="selectedPlace.description"></textarea>
                    </div>

                    <div class="form-group">
                        <label for="latitudeInput"><b>Latitude & Longitude</b></label>
                        <input type="number" class="form-control" id="latitudeInput" placeholder="Enter latitude" v-model="selectedPlace.coordinates.lat">
                        <br>
                        <input type="number" class="form-control" id="longitudeInput" placeholder="Enter longitude" v-model="selectedPlace.coordinates.lng">
                        <small id="emailHelp" class="form-text text-muted">Geographic location</small>
                    </div>

                    <br>

                    <div class="form-group">
                        <label for="gmapsAutoComplete"><b>Autocomplete via Google Maps</b></label>
                        <gmap-autocomplete
                            ref="gmapsAutoComplete"
                            id="gmapsAutoComplete"
                            class="form-control"
                            @place_changed="setPlace"
                            placeholder="Enter place / address"
                        >
                        </gmap-autocomplete>
                        <small id="emailHelp" class="form-text text-muted">Type in the place and Google Maps will try to fill in as much information as possible automatically!</small>
                    </div>

                    <br>
                    <button type="button" class="btn btn-block btn-outline-danger" v-on:click="deleteSelectedPlace()">Delete this place</button>
                </form>

            </div>
            <div class='col-7 panel placePhotosPanel'>
                <h3>Place - Photos</h3>
                <small v-if="selectedPlace" class="text-muted">Tip: Drag the numbers to re-order the photos!</small>

                <h6 v-if="!selectedPlace">Select a place on the left to add/edit photos!</h6>

                <div v-if="selectedPlace" class="photoTableContainer">
                    <table v-if="selectedPlace" class="table table-striped table-bordered table-sm">
                        <thead class="thead-inverse">
                            <tr>
                                <th class="text-center">#</th>
                                <th class="text-center">Preview</th>
                                <th class="text-center">File Name</th>
                                <th class="text-center">Description</th>
                                <th class="text-center">Image / Video</th>
                                <th class="text-center">Delete</th>
                            </tr>
                        </thead>
                        <draggable :options="{handle:'.draghere'}" :element="'tbody'" v-model="selectedPlace.photos" @start="drag=true" @end="drag=false">
                            <tr class="tableRowPhoto" v-bind:key="index" v-for="(photo, index) in selectedPlace.photos">
                                <td class="text-center draghere">{{ index + 1 }}</th>
                                <td class="text-center">
                                    <span v-if="!photo.base64data">N/A</span>
                                    <img v-if="photo.base64data" v-bind:src="photo.base64data"></img>

                                </td>
                                <td class="text-center">{{ photo.fileName }}</td>
                                <td class="text-center">
                                    <input type="text" class="form-control" id="idInput" placeholder="Enter description" v-model="photo.description">
                                </td>

                                <td class="text-center">
                                    <select class="custom-select" v-model="photo.type">
                                        <option>image</option>
                                        <option>video</option>
                                    </select>
                                </td>

                                <td class="text-center">
                                    <button v-on:click="deletePhoto(index)" type="button" class="btn btn-outline-danger">X</button>
                                </td>
                            </tr>
                        </draggable>
                    </table>
                </div>

                <!-- <span>{{ JSON.stringify(this.travelData) }}</span> -->

                <div v-if="selectedPlace" class="photoDrop">
                    <div class="photoDropInputWrapper">
                        <span>Select or Drag/Drop Photos & Videos <b>here</b> to add them to this place!</span>
                        <input @change="handlePhotoDrop" class="photoDropInput" type="file" multiple>
                    </div>
                </div>

            </div>
        </div>

        <a id="downloadAnchorElem" style="display:none"></a>
    </div>
</template>

<script>
    import Vue from 'vue'
    import draggable from 'vuedraggable'
    import * as VueGoogleMaps from 'vue2-google-maps'

    Vue.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyCYDsC1hsS1WuBBWceVWhba3OuatvZ79qI',
            libraries: 'places'
        }
    })

    export default {

        name: 'main',
        components: {draggable},
        data () {
            return {
                imageSrc: undefined,
                selectedPlace: undefined,
                showLoadModal: false,
                travelData: {
                    places: []
                }
            }
        },
        created: function () {

        },
        methods: {
            saveButtonClick: function () {
                const jsonDataToSave = this.travelData

                for (let i = 0; i < jsonDataToSave.places.length; i++) {
                    const place = jsonDataToSave.places[i]

                    for (let j = 0; j < place.photos.length; j++) {
                        const photo = place.photos[j]

                        delete photo.base64data
                    }
                }

                const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(jsonDataToSave, null, 4))
                const dlAnchorElem = document.getElementById('downloadAnchorElem')
                dlAnchorElem.setAttribute('href', dataStr)
                dlAnchorElem.setAttribute('download', 'travelData.json')
                dlAnchorElem.click()
            },
            loadFile: function () {
                let file
                let fileReader

                if (typeof window.FileReader !== 'function') {
                    alert("The file API isn't supported on this browser yet.")

                    return
                }

                const input = document.getElementById('fileinput')
                if (!input) {
                    alert("Couldn't find the fileinput element.")
                } else if (!input.files) {
                    alert("This browser doesn't seem to support the `files` property of file inputs.")
                } else if (!input.files[0]) {
                    alert("Please select a file before clicking 'Load'")
                } else {
                    file = input.files[0]
                    fileReader = new FileReader()
                    fileReader.onload = this.receivedText
                    fileReader.readAsText(file)

                    this.showLoadModal = false
                }
            },
            receivedText: function (e) {
                const lines = e.target.result
                this.travelData = JSON.parse(lines)
            },
            listPlaceClicked: function (place, index) {
                this.selectedPlace = place
                this.handlePlaceListSelection(index)

                if (this.$refs.gmapsAutoComplete) {
                    this.$refs.gmapsAutoComplete.$el.value = ''
                }
            },
            deletePhoto: function (index) {
                this.selectedPlace.photos.splice(index, 1)
            },
            handlePhotoDrop: function (event) {
                const input = event.target

                for (let i = 0; i < input.files.length; i++) {
                    const file = input.files[i]

                    const fileType = file.type.split('/')[0]

                    const reader = new FileReader()

                    const vm = this

                    reader.onload = function (e) {
                        const newImg = document.createElement('img')
                        newImg.src = e.target.result

                        newImg.onload = function () {
                            let imgData

                            if (fileType === 'image') {
                                imgData = vm.resizedataURL(newImg, 100, 100)
                            } else {
                                imgData = undefined
                            }

                            vm.selectedPlace.photos.push({
                                fileName: file.name,
                                description: file.name,
                                type: fileType,
                                base64data: imgData
                            })
                        }
                    }

                    reader.readAsDataURL(file)
                }
            },
            resizedataURL: function (img, maxWidth, maxHeight) {
                const canvas = document.createElement('canvas')
                const ctx = canvas.getContext('2d')

                const biggerSide = img.width > img.height ? 'width' : 'height'
                const smallerSide = img.width > img.height ? 'height' : 'width'

                const verh = img[smallerSide] / img[biggerSide]

                img[biggerSide] = 100
                img[smallerSide] = 100 * verh

                canvas[biggerSide] = 100
                canvas[smallerSide] = 100 * verh

                ctx.drawImage(img, 0, 0, img.width, img.height)

                return canvas.toDataURL()
            },
            createNewListPlace: function () {
                const newItemIndex = this.travelData.places.push({
                    id: '',
                    name: '',
                    description: '',
                    coordinates: {
                        lat: null,
                        lng: null
                    },
                    photos: []
                }) - 1

                this.$nextTick(function () {
                    this.handlePlaceListSelection(newItemIndex)

                    this.clickOnListItemByIndex(newItemIndex)
                })
            },
            clickOnListItemByIndex: function (index) {
                this.$refs['listItem' + index][0].click()
            },
            handlePlaceListSelection: function (selectedIndex) {
                this.$refs['listItem' + selectedIndex][0].classList.add('active')

                for (const ref in this.$refs) {
                    if (ref.includes('listItem') && ref !== 'listItem' + selectedIndex) {
                        if (this.$refs[ref].length > 0) {
                            this.$refs[ref][0].classList.remove('active')
                        }
                    }
                }
            },
            deleteSelectedPlace: function () {
                let itemBeforeIndex
                for (let i = 0; i < this.travelData.places.length; i++) {
                    const place = this.travelData.places[i]

                    if (place === this.selectedPlace) {
                        this.travelData.places.splice(i, 1)
                        itemBeforeIndex = i - 1
                        break
                    }
                }

                if (itemBeforeIndex >= 0) {
                    this.handlePlaceListSelection(itemBeforeIndex)
                    this.selectedPlace = this.travelData.places[itemBeforeIndex]
                } else if (this.travelData.places.length > 0) {
                    this.handlePlaceListSelection(0)
                    this.selectedPlace = this.travelData.places[0]
                } else {
                    this.selectedPlace = undefined
                }
            },
            setPlace: function (place) {
                this.selectedPlace.id = place.name.toLowerCase().replace(/ /g, '')
                this.selectedPlace.name = place.name
                this.selectedPlace.coordinates = {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng()
                }
            },
            placeListDragEnd: function (evt) {
                this.handlePlaceListSelection(evt.newIndex)
                this.clickOnListItemByIndex(evt.newIndex)
            }
        }
    }
</script>

<style scoped>

.photoDrop {
  display: flex;
  height: 14em;
  padding-top: 1em;
  border-radius: 40px;
}

.photoDropInputWrapper {
  overflow: hidden;
  position: relative;
  background: #eee;
  border-radius: 1px;
  float: left;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: rgba(0, 0, 0, 0.2);
  transition: 0.4s background;
  border-radius: 40px;
  /* border: 0.3em dashed white; */
}

.photoDropInputWrapper:hover {
  background: #e0e0e0;
}

.photoDropInput {
  cursor: inherit;
  display: block;
  font-size: 999px;
  min-height: 100%;
  opacity: 0;
  position: absolute;
  right: 0;
  text-align: right;
  top: 0;
  cursor: pointer;
}

h3 {
    margin-bottom: 0.5em;
}

.photoTableContainer {
    /* background-color: red; */
    width: 100%;
    height: calc(100% - 19em);
    overflow-y: auto;
}

.table > thead > tr > th {
     vertical-align: middle;
}

.table > tbody > tr > td {
     vertical-align: middle;
}

.fade {
    opacity: 1;
    background-color: rgba(0,0,0,0) !important;
}

.modal {
    position: absolute;
    top: calc(50% - 200px);
    left: 0;
    display: inline-block;
    overflow: visible;
}

.modalBackgdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.75);
    z-index: 1000;
}

.btn {
    cursor: pointer;
}

.placeListWrapper {
    overflow-y: auto;
    max-height: calc(100vh - 15em);
}

.panelRow {
    height: calc(100vh - 54px);
    width: 100%;
    margin-left: 0px;
    margin-right: 0px;
}

.panel {
    padding-top: 1em;
}

.navar-buttons {
    margin-left: 2em;
    margin-right: 1em;
}

.floating-button {
    position: absolute;
    bottom: 2em;
    left: 10%;
    width: 80%;
}

.placeListItem {
    cursor: pointer;
}

.draghere {
    cursor: pointer;
}

.placeListDescription {
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
}

.arrowSpan {
    font-size: 2em;
}

.placeListPanel {
    /* background-color: #c2dfb8; */
    position: relative;
}
.editPlacePanel {
    /* background-color: #efbfa3; */
    border-left: 1px solid rgba(0, 0, 0, 0.25);
    border-right: 1px solid rgba(0, 0, 0, 0.25);
    overflow-y: auto;
    padding-bottom: 1em;
}
.placePhotosPanel {
    /* background-color: #cdbded; */
    position: relative;
}

</style>
