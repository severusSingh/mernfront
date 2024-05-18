import axios from 'axios';
import { toast } from 'react-hot-toast';

// Pass the user object as a parameter to the function
export const UpdateSettings = async (user, data, type) => {
  const token = user.token;
  console.log(token);
  try {
    const url =
      type === 'password'
        ? `https://mernback-a2n5.onrender.com/api/v1/users/updateMyPassword`
        : `https://mernback-a2n5.onrender.com/api/v1/users/updateMe`;

    const options = {
      headers: { Authorization: `Bearer ${token}}` },
    };
    const { data: updatedData } = await axios.patch(url, data, options);

    if (updatedData.status === 'success') {
      toast.success(`${type.toUpperCase()} updated successfully`);
      console.log(updatedData.data);
      return updatedData.data.user.data;
    }
  } catch (err) {
    toast.error(data.error);
  }
};
