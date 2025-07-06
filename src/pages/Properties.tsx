import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUpload, UploadedFile } from "@/components/ui/file-upload";
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
  Building,
  UserCheck,
  UserX,
  Calendar,
  Star,
  Edit,
  Upload as UploadIcon,
  Image as ImageIcon,
  Filter,
} from "lucide-react";

interface Unit {
  id: number;
  unitNumber: string;
  type: string;
  size: string;
  floor: number;
  rent: string;
  status: "occupied" | "vacant" | "maintenance";
  tenant?: {
    name: string;
    phone: string;
    moveInDate: string;
  };
  amenities: string[];
  images: UploadedFile[];
}

interface Property {
  id: number;
  name: string;
  address: string;
  images: UploadedFile[];
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  maintenanceUnits: number;
  amenities: string[];
  nearbyFacilities: { name: string; distance: string; count?: string }[];
  units: Unit[];
}

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(
    null,
  );
  const [isPropertyDetailOpen, setIsPropertyDetailOpen] = useState(false);
  const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false);
  const [unitStatusFilter, setUnitStatusFilter] = useState<string>("all");

  const [propertyFormData, setPropertyFormData] = useState({
    name: "",
    address: "",
    totalUnits: "",
    amenities: [] as string[],
  });

  const [propertyImages, setPropertyImages] = useState<UploadedFile[]>([]);

  const [properties, setProperties] = useState<Property[]>([
    {
      id: 1,
      name: "Sunrise Apartments",
      address: "123 Main Street, Koramangala, Bangalore",
      images: [
        {
          id: "1",
          name: "main-building.jpg",
          size: 1024000,
          type: "image/jpeg",
          url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=200&fit=crop",
          isPrimary: true,
        },
        {
          id: "2",
          name: "entrance.jpg",
          size: 800000,
          type: "image/jpeg",
          url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=200&fit=crop",
        },
      ],
      totalUnits: 20,
      occupiedUnits: 17,
      vacantUnits: 2,
      maintenanceUnits: 1,
      amenities: ["Parking", "Security", "Elevator", "Power Backup"],
      nearbyFacilities: [
        { name: "Main Road", distance: "200m", count: "2 nearby" },
        { name: "Hospitals", distance: "2 nearby" },
        { name: "Schools", distance: "2 nearby" },
      ],
      units: [
        {
          id: 1,
          unitNumber: "A-101",
          type: "2BHK",
          size: "1200 sq ft",
          floor: 1,
          rent: "₹25,000",
          status: "occupied",
          tenant: {
            name: "Raj Kumar",
            phone: "+91 9876543210",
            moveInDate: "Jun 2023",
          },
          amenities: ["Balcony", "Modular Kitchen", "Wardrobe"],
          images: [
            {
              id: "u1-1",
              name: "living-room.jpg",
              size: 500000,
              type: "image/jpeg",
              url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
              isPrimary: true,
            },
          ],
        },
        {
          id: 2,
          unitNumber: "A-102",
          type: "3BHK",
          size: "1500 sq ft",
          floor: 1,
          rent: "₹28,000",
          status: "vacant",
          amenities: ["Balcony", "Modular Kitchen", "Master Bedroom"],
          images: [],
        },
        {
          id: 3,
          unitNumber: "B-201",
          type: "2BHK",
          size: "1100 sq ft",
          floor: 2,
          rent: "₹24,000",
          status: "maintenance",
          amenities: ["Balcony", "Modular Kitchen"],
          images: [],
        },
      ],
    },
    {
      id: 2,
      name: "Green Valley Residency",
      address: "456 Park Avenue, Indiranagar, Bangalore",
      images: [
        {
          id: "3",
          name: "green-valley.jpg",
          size: 1200000,
          type: "image/jpeg",
          url: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=200&fit=crop",
          isPrimary: true,
        },
      ],
      totalUnits: 30,
      occupiedUnits: 22,
      vacantUnits: 6,
      maintenanceUnits: 2,
      amenities: ["Swimming Pool", "Gym", "Garden", "Clubhouse"],
      nearbyFacilities: [
        { name: "Main Road", distance: "100m", count: "2 nearby" },
        { name: "Hospitals", distance: "2 nearby" },
        { name: "Schools", distance: "2 nearby" },
      ],
      units: [],
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

  // Real-time statistics calculation
  useEffect(() => {
    setProperties((prev) =>
      prev.map((property) => {
        const occupied = property.units.filter(
          (u) => u.status === "occupied",
        ).length;
        const vacant = property.units.filter(
          (u) => u.status === "vacant",
        ).length;
        const maintenance = property.units.filter(
          (u) => u.status === "maintenance",
        ).length;

        return {
          ...property,
          occupiedUnits: occupied,
          vacantUnits: vacant,
          maintenanceUnits: maintenance,
          totalUnits: occupied + vacant + maintenance,
        };
      }),
    );
  }, []);

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

    const newProperty: Property = {
      id: properties.length + 1,
      name: propertyFormData.name,
      address: propertyFormData.address,
      images: propertyImages,
      totalUnits: parseInt(propertyFormData.totalUnits),
      occupiedUnits: 0,
      vacantUnits: parseInt(propertyFormData.totalUnits),
      maintenanceUnits: 0,
      amenities: propertyFormData.amenities,
      nearbyFacilities: [
        { name: "Main Road", distance: "500m", count: "1 nearby" },
        { name: "Hospitals", distance: "1 nearby" },
        { name: "Schools", distance: "1 nearby" },
      ],
      units: [],
    };

    setProperties((prev) => [...prev, newProperty]);
    setIsAddModalOpen(false);
    setPropertyFormData({
      name: "",
      address: "",
      totalUnits: "",
      amenities: [],
    });
    setPropertyImages([]);
  };

  const viewPropertyDetails = (property: Property) => {
    setSelectedProperty(property);
    setIsPropertyDetailOpen(true);
  };

  const getFilteredUnits = (property: Property) => {
    if (unitStatusFilter === "all") return property.units;
    return property.units.filter((unit) => unit.status === unitStatusFilter);
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "occupied":
        return "default";
      case "vacant":
        return "secondary";
      case "maintenance":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "occupied":
        return <UserCheck className="w-4 h-4" />;
      case "vacant":
        return <HomeIcon className="w-4 h-4" />;
      case "maintenance":
        return <UserX className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
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
          subtitle="Manage your property portfolio with real-time updates"
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
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Property</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleAddProperty} className="space-y-6">
                    <Tabs defaultValue="details" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">
                          Property Details
                        </TabsTrigger>
                        <TabsTrigger value="images">Images</TabsTrigger>
                        <TabsTrigger value="amenities">Amenities</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="space-y-4">
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
                            placeholder="Number of units"
                            value={propertyFormData.totalUnits}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="images" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Property Images</Label>
                          <FileUpload
                            accept="image/*"
                            maxFiles={10}
                            maxSize={5}
                            uploadType="images"
                            allowPrimarySelection={true}
                            onFilesChange={setPropertyImages}
                            initialFiles={propertyImages}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="amenities" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Select Amenities</Label>
                          <div className="grid grid-cols-2 gap-4">
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
                                    handleAmenityChange(
                                      amenity,
                                      checked as boolean,
                                    )
                                  }
                                />
                                <Label htmlFor={amenity} className="text-sm">
                                  {amenity}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>

                    <Button type="submit" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Property
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          }
        />

        <main className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="hover:shadow-lg transition-shadow"
              >
                <div className="relative">
                  <img
                    src={
                      property.images.find((img) => img.isPrimary)?.url ||
                      property.images[0]?.url ||
                      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=200&fit=crop"
                    }
                    alt={property.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {property.images.length > 1 && (
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      {property.images.length}
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{property.name}</h3>
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {property.address}
                      </p>
                    </div>
                  </div>

                  {/* Real-time Unit Statistics */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="text-center p-2 bg-gray-50 rounded">
                      <div className="font-semibold text-sm text-blue-600">
                        {property.totalUnits}
                      </div>
                      <div className="text-xs text-gray-600">Total</div>
                    </div>
                    <div className="text-center p-2 bg-green-50 rounded cursor-pointer hover:bg-green-100 transition-colors">
                      <div className="font-semibold text-sm text-green-600">
                        {property.occupiedUnits}
                      </div>
                      <div className="text-xs text-gray-600">Occupied</div>
                    </div>
                    <div className="text-center p-2 bg-orange-50 rounded cursor-pointer hover:bg-orange-100 transition-colors">
                      <div className="font-semibold text-sm text-orange-600">
                        {property.vacantUnits}
                      </div>
                      <div className="text-xs text-gray-600">Vacant</div>
                    </div>
                    <div className="text-center p-2 bg-red-50 rounded cursor-pointer hover:bg-red-100 transition-colors">
                      <div className="font-semibold text-sm text-red-600">
                        {property.maintenanceUnits}
                      </div>
                      <div className="text-xs text-gray-600">Maintenance</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {property.amenities.slice(0, 3).map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="text-xs px-2 py-1"
                      >
                        {amenity}
                      </Badge>
                    ))}
                    {property.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        +{property.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => viewPropertyDetails(property)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedProperty(property);
                        setIsEditPropertyOpen(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Property Details Modal */}
          <Dialog
            open={isPropertyDetailOpen}
            onOpenChange={setIsPropertyDetailOpen}
          >
            <DialogContent className="sm:max-w-[1000px] max-h-[90vh] overflow-y-auto">
              {selectedProperty && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      {selectedProperty.name}
                    </DialogTitle>
                  </DialogHeader>

                  <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="overview">Overview</TabsTrigger>
                      <TabsTrigger value="units">
                        Units ({selectedProperty.units.length})
                      </TabsTrigger>
                      <TabsTrigger value="gallery">Gallery</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-2">
                            Property Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <p>
                              <span className="font-medium">Address:</span>{" "}
                              {selectedProperty.address}
                            </p>
                            <p>
                              <span className="font-medium">Total Units:</span>{" "}
                              {selectedProperty.totalUnits}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">
                            Real-time Statistics
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            <Card className="p-3 bg-green-50">
                              <div className="text-center">
                                <div className="text-lg font-bold text-green-600">
                                  {selectedProperty.occupiedUnits}
                                </div>
                                <div className="text-xs text-green-700">
                                  Occupied Units
                                </div>
                              </div>
                            </Card>
                            <Card className="p-3 bg-orange-50">
                              <div className="text-center">
                                <div className="text-lg font-bold text-orange-600">
                                  {selectedProperty.vacantUnits}
                                </div>
                                <div className="text-xs text-orange-700">
                                  Vacant Units
                                </div>
                              </div>
                            </Card>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Amenities</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedProperty.amenities.map((amenity) => (
                            <Badge key={amenity} variant="secondary">
                              {amenity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="units" className="space-y-4">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <Filter className="w-4 h-4" />
                          <Select
                            value={unitStatusFilter}
                            onValueChange={setUnitStatusFilter}
                          >
                            <SelectTrigger className="w-40">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All Units</SelectItem>
                              <SelectItem value="occupied">
                                Occupied ({selectedProperty.occupiedUnits})
                              </SelectItem>
                              <SelectItem value="vacant">
                                Vacant ({selectedProperty.vacantUnits})
                              </SelectItem>
                              <SelectItem value="maintenance">
                                Maintenance ({selectedProperty.maintenanceUnits}
                                )
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getFilteredUnits(selectedProperty).map((unit) => (
                          <Card key={unit.id}>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-2">
                                <h5 className="font-semibold">
                                  {unit.unitNumber}
                                </h5>
                                <Badge
                                  variant={getStatusBadgeVariant(unit.status)}
                                >
                                  {getStatusIcon(unit.status)}
                                  <span className="ml-1 capitalize">
                                    {unit.status}
                                  </span>
                                </Badge>
                              </div>
                              <div className="text-sm space-y-1">
                                <p>
                                  <span className="font-medium">Type:</span>{" "}
                                  {unit.type}
                                </p>
                                <p>
                                  <span className="font-medium">Size:</span>{" "}
                                  {unit.size}
                                </p>
                                <p>
                                  <span className="font-medium">Floor:</span>{" "}
                                  {unit.floor}
                                </p>
                                <p>
                                  <span className="font-medium">Rent:</span>{" "}
                                  {unit.rent}
                                </p>
                                {unit.tenant && (
                                  <div className="pt-2 border-t">
                                    <p>
                                      <span className="font-medium">
                                        Tenant:
                                      </span>{" "}
                                      {unit.tenant.name}
                                    </p>
                                    <p>
                                      <span className="font-medium">
                                        Move-in:
                                      </span>{" "}
                                      {unit.tenant.moveInDate}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="gallery" className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedProperty.images.map((image) => (
                          <div key={image.id} className="relative">
                            <img
                              src={image.url}
                              alt={image.name}
                              className="w-full h-32 object-cover rounded"
                            />
                            {image.isPrimary && (
                              <Badge className="absolute top-1 left-1">
                                <Star className="w-3 h-3 mr-1 fill-current" />
                                Primary
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Properties;
