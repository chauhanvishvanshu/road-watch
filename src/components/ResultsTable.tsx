import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useApp } from '@/contexts/AppContext';
import { format } from 'date-fns';
import { ArrowUpDown, Search, Filter } from 'lucide-react';

const getSeverityColor = (severity: string): "default" | "secondary" | "destructive" | "outline" | "warning" => {
  switch (severity) {
    case 'Critical':
      return 'destructive';
    case 'High':
      return 'warning';
    case 'Medium':
      return 'secondary';
    case 'Low':
      return 'default';
    default:
      return 'default';
  }
};

const ResultsTable = () => {
  const { detections } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [damageTypeFilter, setDamageTypeFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<'timestamp' | 'severity' | 'depth'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const filteredAndSortedDetections = useMemo(() => {
    let filtered = [...detections];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.damageType.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.severity.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Severity filter
    if (severityFilter !== 'all') {
      filtered = filtered.filter((d) => d.severity === severityFilter);
    }

    // Damage type filter
    if (damageTypeFilter !== 'all') {
      filtered = filtered.filter((d) => d.damageType === damageTypeFilter);
    }

    // Sorting
    filtered.sort((a, b) => {
      let comparison = 0;

      if (sortField === 'timestamp') {
        comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
      } else if (sortField === 'depth') {
        comparison = a.depth - b.depth;
      } else if (sortField === 'severity') {
        const severityOrder = { Low: 1, Medium: 2, High: 3, Critical: 4 };
        comparison = severityOrder[a.severity] - severityOrder[b.severity];
      }

      return sortOrder === 'asc' ? comparison : -comparison;
    });

    return filtered;
  }, [detections, searchTerm, severityFilter, damageTypeFilter, sortField, sortOrder]);

  const toggleSort = (field: 'timestamp' | 'severity' | 'depth') => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  if (detections.length === 0) {
    return (
      <Card className="p-12 text-center">
        <div className="max-w-md mx-auto space-y-3">
          <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center">
            <Filter className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold">No results to display</h3>
          <p className="text-sm text-muted-foreground">
            Upload and process a video to see detection results
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by type or severity..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Critical">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={damageTypeFilter} onValueChange={setDamageTypeFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="Pothole">Pothole</SelectItem>
              <SelectItem value="Crack">Crack</SelectItem>
              <SelectItem value="Patch">Patch</SelectItem>
              <SelectItem value="Debris">Debris</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">ID</TableHead>
                <TableHead className="font-semibold">Damage Type</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort('severity')}
                    className="font-semibold"
                  >
                    Severity
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort('depth')}
                    className="font-semibold"
                  >
                    Depth (cm)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
                <TableHead className="font-semibold">Location</TableHead>
                <TableHead>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleSort('timestamp')}
                    className="font-semibold"
                  >
                    Timestamp
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                  </Button>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAndSortedDetections.map((detection, index) => (
                <TableRow
                  key={detection.id}
                  className={index % 2 === 0 ? 'bg-background' : 'bg-muted/20'}
                >
                  <TableCell className="font-mono text-sm">#{detection.id}</TableCell>
                  <TableCell className="font-medium">{detection.damageType}</TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(detection.severity)}>
                      {detection.severity}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono">{detection.depth}</TableCell>
                  <TableCell className="text-sm text-muted-foreground font-mono">
                    {detection.latitude.toFixed(4)}, {detection.longitude.toFixed(4)}
                  </TableCell>
                  <TableCell className="text-sm">
                    {format(new Date(detection.timestamp), 'PP p')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      <div className="flex items-center justify-between text-sm text-muted-foreground px-2">
        <span>
          Showing {filteredAndSortedDetections.length} of {detections.length} results
        </span>
      </div>
    </div>
  );
};

export default ResultsTable;
