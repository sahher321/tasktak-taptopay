import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Image,
  FlatList,
  Permission,
  Modal,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import ImageCropper from 'react-native-image-crop-picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PERMISSIONS, check, request, RESULTS } from 'react-native-permissions';
const { height, width } = Dimensions.get("window");

const permissionType = Object.freeze({
  camera: 'Camera',
  library: 'library',
});

const CustomImagePicker = forwardRef(({ imageData, setImageData }, _ref) => {

  // const [imageData, setImageData] = React.useState({
  //   uri: '',
  //   base64: '',
  //   type: '',
  // });

  const [modal, setModal] = React.useState(false);
  imageData.uri != '' ? { uri: imageData.uri } : { uri: 'https://www.biowritingservice.com/wp-content/themes/tuborg/images/Executive%20Bio%20Sample%20Photo.png', };

  useEffect(() => {
  }, [])

  useImperativeHandle(_ref, () => ({
    open: () => { _chooseImage() }
  }))

  const _chooseImage = () => {
    setModal(true);
  };

  const _fromLibrary = () => {
    if (Platform.OS == 'ios') {
      console.log(`CAMERA PLATFORM ${Platform.OS}`);
      _checkIfGrantedForIOS(permissionType.library);
    } else {
      setModal(false);
      _getImageFromLibrary();
    }
  };

  const _fromCamera = () => {


    if (Platform.OS == 'ios') {
      console.log(`CAMERA PLATFORM ${Platform.OS}`);
      _checkIfGrantedForIOS(permissionType.camera);
    } else {
      check(PERMISSIONS.ANDROID.CAMERA)
        .then((result) => {
          switch (result) {
            case RESULTS.UNAVAILABLE:
              request(PERMISSIONS.ANDROID.CAMERA).then((result) => {

              });
              break;
            case RESULTS.DENIED:
              console.log('The permission has not been requested / is denied but requestable');
              request(PERMISSIONS.ANDROID.CAMERA).then((result) => {
                setModal(false);
                _getImageFromCamera();
              });
              break;
            case RESULTS.LIMITED:
              console.log('The permission is limited: some actions are possible');
              break;
            case RESULTS.GRANTED:
              console.log('The permission is granted');
              setModal(false);
              _getImageFromCamera(); 
              break;
            case RESULTS.BLOCKED:
              console.log('The permission is denied and not requestable anymore');
              break;
          }
        })
        .catch((error) => {
        });
    }
  };

  const _editPic = (payload) => {
    // alert(image)
    ImageCropper.openCropper({
      path: payload.uri,
      includeBase64: true,
      mediaType: 'photo',
      maxFiles: 1,
      multiple: false,
      width: 250,
      height: 250
    }).then(image => {
      setImageData({
        uri: image.path,
        base64: image.data,
        type: image.mime,
      });
      // alert(JSON.stringify(image));
    }).catch((e) => {
      // alert(e)
    });
  }

  const _getImageFromCamera = () => {
    setModal(false);
    setTimeout(() => {
      launchCamera({ includeBase64: true }, response => {
        if (response.didCancel != undefined && response.didCancel == true) {
          return;
        }
        else if (response.assets) {
          let payload = response?.assets[0];
          if (payload) {
            // store._setUserImage(response.uri)
            // setImageData({
            //   uri: payload.uri,
            //   base64: payload.base64,
            //   type: payload.type,
            // });
            _editPic(payload)

            // this.setState({url:response.uri,picUpdated:true})
            // store.setImage(response.uri)
          }
        }
        console.log(
          `ERROR OBJECT CAMERA..->${JSON.stringify(response.errorCode)}`,
        );
        // console.log(
        //   `RESPONSE OBJECT CAMERA..->${JSON.stringify(
        //     response?.assets[0],
        //     null,
        //     2,
        //   )}`,
        // );

        console.log('resposne');
      });
    }, 1000);
  };

  const _checkIfGrantedForIOS = async type => {
    switch (type) {
      case permissionType.camera:
        let req = await check(PERMISSIONS.IOS.CAMERA);
        let reqLibrary = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        if (req == RESULTS.GRANTED && reqLibrary == RESULTS.GRANTED) {
          setModal(false);
          _getImageFromCamera();
        } else {
          // alert(
          //   "Camera is needed to update the profile picture.A live picture will be captured from camera to update profile picture.Please allow app to access camera from your phone's settings",
          // );
          _getImageFromCamera();
        }
        break;
      case permissionType.library:
        let req2 = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
        console.log("REQ2 => ", req2)
        if (req2 == RESULTS.GRANTED) {
          setModal(false);
          _getImageFromLibrary();
        } else {
          const res2 = await request(PERMISSIONS.IOS.CAMERA);
          console.log("RES2 => ", res2)
          if (res2 === RESULTS.GRANTED) {
            setModal(false);
            _getImageFromLibrary();
          } else {
            _getImageFromLibrary();
            // alert(
            //   "Media Library is needed to update the profile picture.A live picture will be selected from library to update profile picturePlease allow app to access camera from your phone's settings",
            // );
          }
        }
        break;
    }
  };

  const _getImageFromLibrary = () => {
    setModal(false)
    setTimeout(() => {
      launchImageLibrary({ includeBase64: true }, response => {
        console.log(`RESPONSE OBJECT->${JSON.stringify(response)}`);
        console.log('DID CANCEL => ', response.didCancel);
        if (response.didCancel != undefined && response.didCancel == true) {
          return;
        }
        let payload = response?.assets[0];
        if (payload) {
          setTimeout(() => {
            _editPic(payload)
          }, 1000);
        }
        console.log('response');
      });
    }, 1000);
  };

  return (
    <View style={{ flex: 1 }}>
      <_imagePickerModal
        modal={modal}
        setModal={setModal}
        _fromLibrary={_fromLibrary}
        _fromCamera={_fromCamera}
      />
    </View>
  );
});

const _imagePickerModal = ({ modal, setModal, _fromLibrary, _fromCamera }) => (
  <Modal
    visible={modal}
    transparent={true}
    animated={true}
    animationType={'slide'}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        style={{ width: width, height: height }}
        onPress={() => {
          setModal(false);
        }}
      />
      <View
        style={{
          width: width,
          height: height * 0.15,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          position: 'absolute',
          bottom: 0,
        }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              _fromCamera();
            }}>
            <Image
              source={require('./camera.jpg')}
              resizeMode={'contain'}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ color: 'lightgrey' }}>Camera</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
            onPress={() => {
              _fromLibrary();
            }}>
            <Image
              source={require('./Gallery.png')}
              resizeMode={'contain'}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ color: 'lightgrey' }}>Gallery</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // paddingHorizontal: 20
  },
  title: {
    color: 'black',
    fontWeight: 'bold',
    padding: 10,
    textAlign: 'left',
    fontSize: 25,
    marginTop: 20,
    marginStart: 20,
  },
});

// function mapStateToProps(state) {
//     return state;
// }
// const mapDispatchToProps = dispatch => (
//     bindActionCreators({
//         token,
//     }, dispatch))

export default CustomImagePicker;
