import firestore from "@react-native-firebase/firestore";

const createUser = (reqData: any) => {
  const { uid, name, email } = reqData;
  let payload = reqData;
  firestore()
    .collection("users")
    .doc(uid)
    .set(payload)
    .then(() => {
      console.log("User added!");
    })
    .catch((e) => console.log(e, "catch - Firestore.createUser"));
};

const getUser = (uid: string) => {
  return new Promise((resolve, reject) => {
    firestore()
      .collection("users")
      .doc(uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          // console.log("User data: ", documentSnapshot.data());
          (global as any).user = documentSnapshot.data();
          resolve(documentSnapshot.data());
        } else {
          console.log("User does not exist!");
          reject("User does not exist!");
        }
      })
      .catch((e) => {
        console.log(e, "catch - Firestore.getUser");
        reject(e);
      });
  });
};

const Firestore = { createUser, getUser };

export default Firestore;
