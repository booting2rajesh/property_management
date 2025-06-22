import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  MapPin,
  Eye,
  Users,
  Car,
  Shield,
  Zap,
  Plus,
  Search,
  MoreHorizontal,
  Navigation,
  Dumbbell,
  TreePine,
  Home as HomeIcon,
} from "lucide-react";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [propertyFormData, setPropertyFormData] = useState({
    name: "",
    address: "",
    totalUnits: "",
    image: "",
    amenities: [] as string[],
  });

  const [properties, setProperties] = useState([
    {
      id: 1,
      name: "Sunrise Apartments",
      address: "123 Main Street, Koramangala, Bangalore",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=200&fit=crop",
      totalUnits: 20,
      occupiedUnits: 17,
      vacantUnits: 3,
      amenities: ["Parking", "Security", "Elevator", "Power Backup"],
      nearbyFacilities: [
        { name: "Main Road", distance: "200m", count: "2 nearby" },
        { name: "Hospitals", distance: "2 nearby" },
        { name: "Schools", distance: "2 nearby" },
      ],
    },
    {
      id: 2,
      name: "Green Valley Residency",
      address: "456 Park Avenue, Indiranagar, Bangalore",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=200&fit=crop",
      totalUnits: 30,
      occupiedUnits: 22,
      vacantUnits: 8,
      amenities: ["Swimming Pool", "Gym", "Garden", "Clubhouse"],
      nearbyFacilities: [
        { name: "Main Road", distance: "100m", count: "2 nearby" },
        { name: "Hospitals", distance: "2 nearby" },
        { name: "Schools", distance: "2 nearby" },
      ],
    },
  ]);

  const availableAmenities = [
    "Parking",
    "Security",
    "Elevator",
    "Power Backup",
    "Swimming Pool",
    "Gym",
    "Garden",
    "Clubhouse",
    "CCTV",
    "Water Supply",
    "Wifi",
    "Playground",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPropertyFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setPropertyFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleAddProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const newProperty = {
      id: properties.length + 1,
      name: propertyFormData.name,
      address: propertyFormData.address,
      image:
        propertyFormData.image ||
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=200&fit=crop",
      totalUnits: parseInt(propertyFormData.totalUnits),
      occupiedUnits: 0,
      vacantUnits: parseInt(propertyFormData.totalUnits),
      amenities: propertyFormData.amenities,
      nearbyFacilities: [
        { name: "Main Road", distance: "500m", count: "1 nearby" },
        { name: "Hospitals", distance: "1 nearby" },
        { name: "Schools", distance: "1 nearby" },
      ],
    };

    setProperties((prev) => [...prev, newProperty]);
    setIsAddModalOpen(false);
    setPropertyFormData({
      name: "",
      address: "",
      totalUnits: "",
      image: "",
      amenities: [],
    });
  };

  const filteredProperties = properties.filter(
    (property) =>
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.amenities.some((amenity) =>
        amenity.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/properties" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Properties"
          subtitle="Manage your property portfolio"
          actions={
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Property
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Property</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddProperty} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Property Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="Enter property name"
                        value={propertyFormData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        name="address"
                        placeholder="Enter complete address"
                        value={propertyFormData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="totalUnits">Total Units</Label>
                      <Input
                        id="totalUnits"
                        name="totalUnits"
                        type="number"
                        placeholder="Enter number of units"
                        value={propertyFormData.totalUnits}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="image">Image URL (Optional)</Label>
                      <Input
                        id="image"
                        name="image"
                        placeholder="Enter image URL"
                        value={propertyFormData.image}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Amenities</Label>
                      <div className="grid grid-cols-2 gap-3">
                        {availableAmenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={amenity}
                              checked={propertyFormData.amenities.includes(
                                amenity,
                              )}
                              onCheckedChange={(checked) =>
                                handleAmenityChange(amenity, checked as boolean)
                              }
                            />
                            <Label htmlFor={amenity} className="text-sm">
                              {amenity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="flex-1"
                        onClick={() => setIsAddModalOpen(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Add Property
                      </Button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          }
        />

        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden">
                <div className="relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm font-medium">
                    {property.totalUnits} units
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/90 hover:bg-white"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="bg-white/90 hover:bg-white"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-gray-900">
                        {property.name}
                      </h3>
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}
                    </div>
                  </div>

                  {/* Occupancy Status */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-green-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-green-600 mb-1">
                            Occupied
                          </p>
                          <p className="text-2xl font-bold text-green-700">
                            {property.occupiedUnits}
                          </p>
                        </div>
                        <HomeIcon className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="bg-red-50 p-3 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-red-600 mb-1">Vacant</p>
                          <p className="text-2xl font-bold text-red-700">
                            {property.vacantUnits}
                          </p>
                        </div>
                        <HomeIcon className="w-6 h-6 text-red-600" />
                      </div>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Amenities
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {property.amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded"
                        >
                          {amenity === "Parking" && <Car className="w-3 h-3" />}
                          {amenity === "Security" && (
                            <Shield className="w-3 h-3" />
                          )}
                          {amenity === "Elevator" && (
                            <Navigation className="w-3 h-3" />
                          )}
                          {amenity === "Power Backup" && (
                            <Zap className="w-3 h-3" />
                          )}
                          {amenity === "Swimming Pool" && (
                            <Users className="w-3 h-3" />
                          )}
                          {amenity === "Gym" && (
                            <Dumbbell className="w-3 h-3" />
                          )}
                          {amenity === "Garden" && (
                            <TreePine className="w-3 h-3" />
                          )}
                          {amenity === "Clubhouse" && (
                            <HomeIcon className="w-3 h-3" />
                          )}
                          {amenity}
                        </div>
                      ))}
                      {property.amenities.length > 4 && (
                        <span className="text-xs text-gray-500">+1 more</span>
                      )}
                    </div>
                  </div>

                  {/* Nearby Facilities */}
                  <div className="mb-4">
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Nearby Facilities
                    </p>
                    <div className="space-y-1">
                      {property.nearbyFacilities.map((facility, index) => (
                        <div
                          key={index}
                          className="flex justify-between text-sm text-gray-600"
                        >
                          <span>{facility.name}</span>
                          <span>
                            {facility.distance} {facility.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => (window.location.href = "/units")}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={() => (window.location.href = "/units")}
                    >
                      <Users className="w-4 h-4 mr-2" />
                      Units
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No properties found.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Properties;
