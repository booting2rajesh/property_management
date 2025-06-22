import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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

  const properties = [
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
  ];

  const filteredProperties = properties.filter((property) =>
    property.name.toLowerCase().includes(searchTerm.toLowerCase()),
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
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
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
