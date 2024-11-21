import Navbar from "./Navbar";

function EditProfile() {
  return (
    <>
      <Navbarr />

      <section className="py-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row mt-4">
            <div className="w-full md:w-9/12 md:pl-4">
              <div className="bg-white shadow-md rounded-lg">
                <div className="p-6 border-b">
                  <h3 className="text-xl font-semibold mb-2">
                    Profile Details
                  </h3>
                  <p className="text-gray-600">
                    You have full control to manage your own account setting.
                  </p>
                </div>
                <form className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between mb-6">
                    <div className="flex items-center mb-4 md:mb-0">
                      <img
                        src="default/png"
                        className="w-24 h-24 rounded-full object-cover"
                        alt="avatar"
                      />
                      <div className="ml-4">
                        <h4 className="font-semibold mb-1">Your avatar</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          JPG less than 800px wide and tall.
                        </p>
                        <input
                          type="file"
                          className="block w-full text-sm text-gray-500 
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                      </div>
                    </div>
                  </div>

                  <hr className="my-6 border-gray-200" />

                  <div>
                    <h4 className="text-lg font-semibold mb-2">
                      Personal Details
                    </h4>
                    <p className="text-gray-600 mb-4">
                      Edit your personal information and address.
                    </p>

                    <div className="space-y-4">
                      <div>
                        <label
                          htmlFor="fname"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          id="fname"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Full Name"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="about"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          About Me
                        </label>
                        <textarea
                          id="about"
                          rows="5"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        ></textarea>
                      </div>

                      <div>
                        <label
                          htmlFor="country"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Country
                        </label>
                        <input
                          type="text"
                          id="country"
                          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Country"
                          required
                        />
                      </div>

                      <div>
                        <button
                          type="submit"
                          className="w-full md:w-auto bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition flex items-center justify-center space-x-2"
                        >
                          <span>Update Profile</span>
                          <i className="fas fa-check-circle"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default EditProfile;
