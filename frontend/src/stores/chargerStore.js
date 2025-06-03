import { defineStore } from "pinia";
import axios from "axios";
import { useToast } from "vue-toastification";

export const getHeaders = () => {
  const token = localStorage.getItem("token") || "";
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
};

export const useChargerStore = defineStore("charger", {
  state: () => ({
    chargers: [],
    filters: {
      status: "",
      powerOutput: "",
      connectorType: "",
    },
    loading: false,
    error: null,
  }),
  actions: {
    async fetchChargersList() {
      const toast = useToast();
      this.loading = true;
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/chargingStation/charging-stations-list"
        );
        this.chargers = response.data.data;
      } catch (e) {
        console.error("fetchChargersList error:", e);
        this.error = e.message || "Failed to load chargers";
        toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    async fetchChargers() {
      const toast = useToast();
      this.loading = true;

      try {
        const params = {};
        if (this.filters.status && this.filters.status.trim() !== "")
          params.status = this.filters.status.trim();
        if (this.filters.powerOutput && this.filters.powerOutput.trim() !== "")
          params.powerOutput = this.filters.powerOutput.trim();
        if (
          this.filters.connectorType &&
          this.filters.connectorType.trim() !== ""
        )
          params.connectorType = this.filters.connectorType.trim();

        const response = await axios.get(
          "http://localhost:4000/api/v1/chargingStation/filter-charing-station",
          { params }
        );
        console.log(response.data)
        // console.warn(chargers)
        this.chargers = response.data.data;
      } catch (e) {
        console.error("fetchChargers error:", e);
        this.error = e.message || "Failed to load chargers";
        toast.error(this.error);
      } finally {
        this.loading = false;
      }
    },
    async addCharger(charger) {
      const toast = useToast();
      try {
        const payload = {
          ...charger,
          latitude: charger.location?.latitude,
          longitude: charger.location?.longitude,
        };
        delete payload.location;
        await axios.post(
          "http://localhost:4000/api/v1/chargingStation/create-charging-station",
          payload,
          { headers: getHeaders() }
        );
        toast.success("Charger added successfully");
        await this.fetchChargers();
      } catch (e) {
        console.error("addCharger error:", e);
        let msg =
          e.response?.status === 401
            ? "Login to add Charging Station"
            : "Failed to add charging station";
        toast.error(msg);
        this.error = msg;
      }
    },
    async editCharger(id, charger) {
      const toast = useToast();
      try {
        const payload = {
          ...charger,
          latitude: charger.location?.latitude,
          longitude: charger.location?.longitude,
        };
        delete payload.location;
        await axios.patch(
          `http://localhost:4000/api/v1/chargingStation/update-charging-station/${id}`,
          payload,
          { headers: getHeaders() }
        );
        toast.success("Charger updated successfully");
        await this.fetchChargersList();
      } catch (e) {
        console.error("editCharger error:", e);
        let msg =
          e.response?.status === 401
            ? "Login to update Charging Station"
            : "Failed to update charging station";
        toast.error(msg);
        this.error = msg;
      }
    },
    async deleteCharger(id) {
      const toast = useToast();
      try {
        await axios.delete(
          `http://localhost:4000/api/v1/chargingStation/delete-charging-station/${id}`,
          {
            headers: getHeaders(),
          }
        );
        toast.success("Charger deleted successfully");
        await this.fetchChargers();
      } catch (e) {
        console.error("deleteCharger error:", e);
        const msg =
          e.response?.data?.message || e.message || "Failed to delete charger";
        toast.error(msg);
        this.error = msg;
      }
    },
    setFilter(key, value) {
      this.filters[key] = value;
    },
  },
});
