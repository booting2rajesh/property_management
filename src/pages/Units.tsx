import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { FileUpload, UploadedFile } from "@/components/ui/file-upload";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import {
  ArrowLeft,
  Plus,
  User,
  Phone,
  Shield,
  Navigation,
  Home as HomeIcon,
  List,
  Filter,
  Star,
  Edit,
  Eye,
  Building,
  Maximize,
  Calendar,
  DollarSign,
  Image as ImageIcon,
  Upload as UploadIcon,
} from "lucide-react";

interface Unit {
  id: number;
  unitNumber: string;
  type: string;
  size: string;
  floor: number;
  rent: string;
  advance: string;
  status: "occupied" | "vacant" | "maintenance";
  tenant?: {
    name: string;
    phone: string;
    moveInDate: string;
  };
  amenities: string[];
  images: UploadedFile[];
  description: string;
  lastUpdated: string;
}

const Units = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const [formData, setFormData] = useState({
    unitNumber: "",
    type: "",
    floor: "",
    size: "",
    rent: "",
    advance: "",
    description: "",
    amenities: [] as string[],
  });

  const [unitImages, setUnitImages] = useState<UploadedFile[]>([]);

  const stats = {
    totalUnits: 20,
    occupiedUnits: 17,
    vacantUnits: 2,
    maintenanceUnits: 1,
    occupancyRate: 85,
  };

  const [units, setUnits] = useState<Unit[]>([
    {
      id: 1,
      unitNumber: "A-101",
      type: "2BHK",
      size: "1200 sq ft",
      floor: 1,
      rent: "₹25,000",
      advance: "₹50,000",
      status: "occupied",
      tenant: {
        name: "Raj Kumar",
        phone: "+91 9876543210",
        moveInDate: "Jun 2023",
      },
      amenities: ["Balcony", "Modular Kitchen", "Wardrobe"],
      images: [
        {
          id: "1",
          name: "living-room.jpg",
          size: 500000,
          type: "image/jpeg",
          url: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop",
          isPrimary: true,
        },
        {
          id: "2",
          name: "bedroom.jpg",
          size: 450000,
          type: "image/jpeg",
          url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=300&h=200&fit=crop",
        },
        {
          id: "3",
          name: "kitchen.jpg",
          size: 400000,
          type: "image/jpeg",
          url: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=200&fit=crop",
        },
      ],
      description:
        "Spacious 2BHK unit with modern amenities and great natural light.",
      lastUpdated: "2024-01-15",
    },
    {
      id: 2,
      unitNumber: "A-102",
      type: "3BHK",
      size: "1500 sq ft",
      floor: 1,
      rent: "₹28,000",
      advance: "₹56,000",
      status: "vacant",
      amenities: ["Balcony", "Modular Kitchen", "Master Bedroom"],
      images: [
        {
          id: "4",
          name: "living-area.jpg",
          size: 600000,
          type: "image/jpeg",
          url: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300&h=200&fit=crop",
          isPrimary: true,
        },
      ],
      description: "Premium 3BHK unit available for immediate move-in.",
      lastUpdated: "2024-01-10",
    },
    {
      id: 3,
      unitNumber: "B-201",
      type: "2BHK",
      size: "1100 sq ft",
      floor: 2,
      rent: "₹24,000",
      advance: "₹48,000",
      status: "maintenance",
      amenities: ["Balcony", "Modular Kitchen"],
      images: [],
      description: "Under maintenance - will be available soon.",
      lastUpdated: "2024-01-05",
    },
  ]);

  const availableAmenities = [
    "Balcony",
    "Modular Kitchen",
    "Wardrobe",
    "AC",
    "Geyser",
    "Furnished",
    "Semi-Furnished",
    "Master Bedroom",
    "Attached Bathroom",
    "Separate Entrance",
    "Parking",
    "Storage Room",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      amenities: checked
        ? [...prev.amenities, amenity]
        : prev.amenities.filter((a) => a !== amenity),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newUnit: Unit = {
      id: units.length + 1,
      unitNumber: formData.unitNumber,
      type: formData.type,
      size: `${formData.size} sq ft`,
      floor: parseInt(formData.floor),
      rent: `₹${formData.rent}`,
      advance: `₹${formData.advance}`,
      status: "vacant",
      amenities: formData.amenities,
      images: unitImages,
      description: formData.description,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setUnits((prev) => [...prev, newUnit]);
    setIsAddModalOpen(false);

    // Reset form
    setFormData({
      unitNumber: "",
      type: "",
      floor: "",
      size: "",
      rent: "",
      advance: "",
      description: "",
      amenities: [],
    });
    setUnitImages([]);
  };

  const viewUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setIsViewModalOpen(true);
  };

  const editUnit = (unit: Unit) => {
    setSelectedUnit(unit);
    setFormData({
      unitNumber: unit.unitNumber,
      type: unit.type,
      floor: unit.floor.toString(),
      size: unit.size.replace(" sq ft", ""),
      rent: unit.rent.replace("₹", ""),
      advance: unit.advance ? unit.advance.replace("��", "") : "",
      description: unit.description,
      amenities: unit.amenities,
    });
    setUnitImages(unit.images);
    setIsEditModalOpen(true);
  };

  const handleEditUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUnit) return;

    const updatedUnit: Unit = {
      ...selectedUnit,
      unitNumber: formData.unitNumber,
      type: formData.type,
      size: `${formData.size} sq ft`,
      floor: parseInt(formData.floor),
      rent: `₹${formData.rent}`,
      advance: `₹${formData.advance}`,
      amenities: formData.amenities,
      images: unitImages,
      description: formData.description,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    setUnits((prev) =>
      prev.map((unit) => (unit.id === selectedUnit.id ? updatedUnit : unit)),
    );

    setIsEditModalOpen(false);
    setSelectedUnit(null);

    // Reset form
    setFormData({
      unitNumber: "",
      type: "",
      floor: "",
      size: "",
      rent: "",
      advance: "",
      description: "",
      amenities: [],
    });
    setUnitImages([]);
  };

  const getStatusVariant = (status: string) => {
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
        return <User className="w-4 h-4" />;
      case "vacant":
        return <HomeIcon className="w-4 h-4" />;
      case "maintenance":
        return <Shield className="w-4 h-4" />;
      default:
        return <Building className="w-4 h-4" />;
    }
  };

  const filteredUnits = units.filter((unit) => {
    const matchesSearch =
      unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || unit.status === statusFilter;

    const matchesType = typeFilter === "all" || unit.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  const uniqueTypes = [...new Set(units.map((unit) => unit.type))];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar currentPath="/units" />

      <div className="flex-1 overflow-auto">
        <Header
          title="Units Management"
          subtitle="Manage individual units with photos and details"
          actions={
            <div className="flex items-center gap-4">
              <Input
                placeholder="Search units..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="occupied">Occupied</SelectItem>
                  <SelectItem value="vacant">Vacant</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  {uniqueTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Unit
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Unit</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <Tabs defaultValue="details" className="space-y-4">
                      <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="details">Unit Details</TabsTrigger>
                        <TabsTrigger value="photos">Photos</TabsTrigger>
                        <TabsTrigger value="amenities">Amenities</TabsTrigger>
                      </TabsList>

                      <TabsContent value="details" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="unitNumber">Unit Number</Label>
                            <Input
                              id="unitNumber"
                              name="unitNumber"
                              placeholder="e.g., A-101"
                              value={formData.unitNumber}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="type">Unit Type</Label>
                            <Select
                              value={formData.type}
                              onValueChange={(value) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  type: value,
                                }))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select type" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="1BHK">1BHK</SelectItem>
                                <SelectItem value="2BHK">2BHK</SelectItem>
                                <SelectItem value="3BHK">3BHK</SelectItem>
                                <SelectItem value="4BHK">4BHK</SelectItem>
                                <SelectItem value="Studio">Studio</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="floor">Floor</Label>
                            <Input
                              id="floor"
                              name="floor"
                              type="number"
                              placeholder="Floor number"
                              value={formData.floor}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="size">Size (sq ft)</Label>
                            <Input
                              id="size"
                              name="size"
                              type="number"
                              placeholder="Size in sq ft"
                              value={formData.size}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="rent">Monthly Rent</Label>
                            <Input
                              id="rent"
                              name="rent"
                              type="number"
                              placeholder="Monthly rent amount"
                              value={formData.rent}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="advance">Security Deposit</Label>
                            <Input
                              id="advance"
                              name="advance"
                              type="number"
                              placeholder="Security deposit amount"
                              value={formData.advance}
                              onChange={handleInputChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="description">Description</Label>
                          <Textarea
                            id="description"
                            name="description"
                            placeholder="Describe the unit features and highlights"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={3}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="photos" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Unit Photos</Label>
                          <p className="text-sm text-gray-600">
                            Upload high-quality photos of the unit. The first
                            photo will be used as the primary image.
                          </p>
                          <FileUpload
                            accept="image/*"
                            maxFiles={15}
                            maxSize={5}
                            uploadType="images"
                            allowPrimarySelection={true}
                            onFilesChange={setUnitImages}
                            initialFiles={unitImages}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="amenities" className="space-y-4">
                        <div className="space-y-2">
                          <Label>Select Amenities</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {availableAmenities.map((amenity) => (
                              <div
                                key={amenity}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={amenity}
                                  checked={formData.amenities.includes(amenity)}
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
                      Add Unit
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          }
        />

        <main className="p-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Total Units
                    </p>
                    <p className="text-2xl font-bold">{stats.totalUnits}</p>
                  </div>
                  <Building className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Occupied
                    </p>
                    <p className="text-2xl font-bold text-green-600">
                      {stats.occupiedUnits}
                    </p>
                  </div>
                  <User className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Vacant</p>
                    <p className="text-2xl font-bold text-orange-600">
                      {stats.vacantUnits}
                    </p>
                  </div>
                  <HomeIcon className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Occupancy Rate
                    </p>
                    <p className="text-2xl font-bold text-blue-600">
                      {stats.occupancyRate}%
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Units Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUnits.map((unit) => (
              <Card key={unit.id} className="hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img
                    src={
                      unit.images.find((img) => img.isPrimary)?.url ||
                      unit.images[0]?.url ||
                      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=300&h=200&fit=crop"
                    }
                    alt={unit.unitNumber}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  {unit.images.length > 1 && (
                    <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                      <ImageIcon className="w-3 h-3 mr-1" />
                      {unit.images.length}
                    </Badge>
                  )}
                  {unit.images.find((img) => img.isPrimary) && (
                    <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Primary
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-lg">{unit.unitNumber}</h3>
                    <Badge variant={getStatusVariant(unit.status)}>
                      {getStatusIcon(unit.status)}
                      <span className="ml-1 capitalize">{unit.status}</span>
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Type:</span>
                      <span className="font-medium">{unit.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Size:</span>
                      <span className="font-medium">{unit.size}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Floor:</span>
                      <span className="font-medium">{unit.floor}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Rent:</span>
                      <span className="font-medium text-green-600">
                        {unit.rent}
                      </span>
                    </div>
                  </div>

                  {unit.tenant && (
                    <div className="bg-gray-50 p-3 rounded mb-4">
                      <div className="flex items-center gap-2 mb-1">
                        <User className="w-4 h-4" />
                        <span className="font-medium">{unit.tenant.name}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-3 h-3" />
                        <span>{unit.tenant.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                        <Calendar className="w-3 h-3" />
                        <span>Since {unit.tenant.moveInDate}</span>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1 mb-4">
                    {unit.amenities.slice(0, 3).map((amenity) => (
                      <Badge
                        key={amenity}
                        variant="secondary"
                        className="text-xs px-2 py-1"
                      >
                        {amenity}
                      </Badge>
                    ))}
                    {unit.amenities.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-1">
                        +{unit.amenities.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                      onClick={() => viewUnit(unit)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => editUnit(unit)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* View Unit Modal */}
          <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
            <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto">
              {selectedUnit && (
                <>
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Unit {selectedUnit.unitNumber}
                      <Badge variant={getStatusVariant(selectedUnit.status)}>
                        {getStatusIcon(selectedUnit.status)}
                        <span className="ml-1 capitalize">
                          {selectedUnit.status}
                        </span>
                      </Badge>
                    </DialogTitle>
                  </DialogHeader>

                  <Tabs defaultValue="details" className="space-y-4">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="details">Unit Details</TabsTrigger>
                      <TabsTrigger value="gallery">
                        Photo Gallery ({selectedUnit.images.length})
                      </TabsTrigger>
                      <TabsTrigger value="tenant">Tenant Info</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold mb-3">
                            Unit Information
                          </h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium">
                                {selectedUnit.type}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Size:</span>
                              <span className="font-medium">
                                {selectedUnit.size}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Floor:</span>
                              <span className="font-medium">
                                {selectedUnit.floor}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Rent:</span>
                              <span className="font-medium text-green-600">
                                {selectedUnit.rent}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Deposit:</span>
                              <span className="font-medium">
                                {selectedUnit.advance}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Amenities</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedUnit.amenities.map((amenity) => (
                              <Badge key={amenity} variant="secondary">
                                {amenity}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      {selectedUnit.description && (
                        <div>
                          <h4 className="font-semibold mb-2">Description</h4>
                          <p className="text-gray-700">
                            {selectedUnit.description}
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="gallery" className="space-y-4">
                      {selectedUnit.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {selectedUnit.images.map((image) => (
                            <div key={image.id} className="relative">
                              <img
                                src={image.url}
                                alt={image.name}
                                className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80 transition-opacity"
                                onClick={() => window.open(image.url, "_blank")}
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
                      ) : (
                        <div className="text-center py-8">
                          <ImageIcon className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-500">No photos uploaded</p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="tenant" className="space-y-4">
                      {selectedUnit.tenant ? (
                        <div className="space-y-4">
                          <h4 className="font-semibold">Current Tenant</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Name
                              </Label>
                              <p className="mt-1">{selectedUnit.tenant.name}</p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Phone
                              </Label>
                              <p className="mt-1">
                                {selectedUnit.tenant.phone}
                              </p>
                            </div>
                            <div>
                              <Label className="text-sm font-medium text-gray-500">
                                Move-in Date
                              </Label>
                              <p className="mt-1">
                                {selectedUnit.tenant.moveInDate}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <User className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                          <p className="text-gray-500">No tenant assigned</p>
                        </div>
                      )}
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </DialogContent>
          </Dialog>

          {/* Edit Unit Modal */}
          <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
            <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Edit Unit {selectedUnit?.unitNumber}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleEditUnit} className="space-y-6">
                <Tabs defaultValue="details" className="space-y-4">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="details">Unit Details</TabsTrigger>
                    <TabsTrigger value="photos">Photos</TabsTrigger>
                    <TabsTrigger value="amenities">Amenities</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="edit-unitNumber">Unit Number</Label>
                        <Input
                          id="edit-unitNumber"
                          name="unitNumber"
                          placeholder="e.g., A-101"
                          value={formData.unitNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-type">Unit Type</Label>
                        <Select
                          value={formData.type}
                          onValueChange={(value) =>
                            setFormData((prev) => ({
                              ...prev,
                              type: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1BHK">1BHK</SelectItem>
                            <SelectItem value="2BHK">2BHK</SelectItem>
                            <SelectItem value="3BHK">3BHK</SelectItem>
                            <SelectItem value="4BHK">4BHK</SelectItem>
                            <SelectItem value="Studio">Studio</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-floor">Floor</Label>
                        <Input
                          id="edit-floor"
                          name="floor"
                          type="number"
                          placeholder="Floor number"
                          value={formData.floor}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-size">Size (sq ft)</Label>
                        <Input
                          id="edit-size"
                          name="size"
                          type="number"
                          placeholder="Size in sq ft"
                          value={formData.size}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-rent">Monthly Rent</Label>
                        <Input
                          id="edit-rent"
                          name="rent"
                          type="number"
                          placeholder="Monthly rent amount"
                          value={formData.rent}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="edit-advance">Security Deposit</Label>
                        <Input
                          id="edit-advance"
                          name="advance"
                          type="number"
                          placeholder="Security deposit amount"
                          value={formData.advance}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="edit-description">Description</Label>
                      <Textarea
                        id="edit-description"
                        name="description"
                        placeholder="Describe the unit features and highlights"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={3}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="photos" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Unit Photos</Label>
                      <p className="text-sm text-gray-600">
                        Upload high-quality photos of the unit. The first photo
                        will be used as the primary image.
                      </p>
                      <FileUpload
                        accept="image/*"
                        maxFiles={15}
                        maxSize={5}
                        uploadType="images"
                        allowPrimarySelection={true}
                        onFilesChange={setUnitImages}
                        initialFiles={unitImages}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="amenities" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Amenities</Label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {availableAmenities.map((amenity) => (
                          <div
                            key={amenity}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`edit-${amenity}`}
                              checked={formData.amenities.includes(amenity)}
                              onCheckedChange={(checked) =>
                                handleAmenityChange(amenity, checked as boolean)
                              }
                            />
                            <Label
                              htmlFor={`edit-${amenity}`}
                              className="text-sm"
                            >
                              {amenity}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Button type="submit" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Update Unit
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default Units;
